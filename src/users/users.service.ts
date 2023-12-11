import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateDtoUser } from './dto/create-user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {}

  public async getUser(id: string): Promise<User> {
    return await this.UserModel.findById(id);
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.UserModel.findOne({ email }).exec();
  }

  public async getAllUsers(): Promise<User[]> {
    return await this.UserModel.find().exec();
  }

  public async createUser(data: CreateDtoUser): Promise<User> {
    const user = await this.UserModel.create(data);
    return user;
  }

  public async removeUser(id: string): Promise<boolean> {
    await this.UserModel.findByIdAndDelete(id);
    return true;
  }
}
