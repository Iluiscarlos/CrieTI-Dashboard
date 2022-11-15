import express, { Express, Request, Response, NextFunction } from 'express';
import { DATEONLY, Model, Op } from 'sequelize';
import UserModel from '../models/User';
import LogModel from '../models/Logs'
// import nodemailer from 'nodemailer';
// import SMTPTransport from 'nodemailer/lib/smtp-transport';
import User from '../models/User';
//import md5 from 'md5';
class UsersController {

  index = async (req: Request, res: Response, Next: NextFunction) => {
    const params: any = req.query;
    const limit: any = params.limit || 100;
    const page: any = params.page || 1;
    const offset: any = (page - 1) * limit;
    const sort: any = params.sort || 'name';
    const order: any = params.order || 'ASC';
    const where: any = {};

    if (params.id) {
      where.id = {
        [Op.eq]: params.id
      };
    }
    if (params.name) {
      where.name = {
        [Op.iLike]: `%${params.name}%`
      };
    }

    if (params.email) {
      where.email = {
        [Op.iLike]: `%${params.email}%`
      };
    }

    if (params.min_age) {
      where.age = {
        [Op.gte]: params.min_age
      };
    }

    if (params.max_age) {
      if (!where.age) {
        where.age = {};
      }
      where.age[Op.lte] = params.max_age;
    }

    if (params.gender) {
      where.gender = params.gender;
    }

    const employee = await UserModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [[sort, order]]
    });
    
    res.json(employee);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //req.body.password = md5(req.body.password);
      const data = await this._validateData(req.body, req.params.userId);
      const user = await UserModel.create(data);
      LogModel.create({
        action: 'User '+user.name+' registred.'
      });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findByPk(req.params.userId);
    res.json(user);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: any = req.params.userId;
      const data = await this._validateData(req.body, id);
      await UserModel.update(data, {
        where: {
          id: id
        }
      });
      LogModel.create({
        action: 'User '+data.name+' updated.'
      });
      res.json(await UserModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await UserModel.destroy({
      where: {
        id: req.params.userId
      }
    });
    LogModel.create({
      action: 'User: '+req.params.name+' deleted.'
    });
    res.json({});
  }
  _validateData = async (data: any, id: any) => {
    const attributes = ['name', 'age', 'gender', 'email', 'password',];
    const user: any = {};
    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      user[attribute] = data[attribute];
    }

    if (await this._checkIfEmailExists(user.email, id)) {
      throw new Error(`The user with mail address "${user.email}" already exists.`);
    }
    if (await this._checkPassword(user.password)) {
      throw new Error(`The password length have been more than 6 caracters .`);
    }

    return user;
  }

  _checkPassword = async (password: string) => {
    if (password.length < 6) {
      return password;
    }
  }

  _checkIfEmailExists = async (email: string, id: Number) => {
    const where: any = {
      email: email
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await UserModel.count({
      where: where
    });

    return count > 0;
  }

}


export default new UsersController();
