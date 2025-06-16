import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './dbInstance';

// TODO: move to a types folder
interface UserAttributes {
  id: string;
  name: string;
  username: string;
  password_hash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// TODO: move to a type folder
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public username!: string;
  public password_hash!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

export default User;
