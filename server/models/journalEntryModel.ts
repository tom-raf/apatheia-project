import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './dbInstance';

// TODO: move to a types file
interface JournalEntryAttributes {
  id: number;
  journal_text: string;
  user_id: string;
  quote_id: number;
  date: string; // YYYY-MM-DD
  createdAt?: Date;
  updatedAt?: Date;
}

// (need to keep id optional because otherwise mad errors)
type JournalEntryCreationAttributes = Optional<JournalEntryAttributes, 'id' | 'createdAt' | 'updatedAt'>;

// TODO:move to types file
class JournalEntry extends Model<JournalEntryAttributes, JournalEntryCreationAttributes>
  implements JournalEntryAttributes {
  public id!: number;
  public journal_text!: string;
  public user_id!: string;
  public quote_id!: number;
  public date!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
JournalEntry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    journal_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quote_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'journal_entries',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'date'],
      },
    ],
  }
);

export default JournalEntry;
