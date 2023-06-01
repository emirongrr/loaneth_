import { models, model, Schema, Types, SchemaTypes } from 'mongoose';
import { Adress } from 'libs/types/adress';

export interface IUser {

  identificationString: String
  email: String;
  firstName: String
  lastName:String
  birthDate:Date
  phoneNumber:String
  password: String
  adress: Adress
  bankAccounts: Types.ObjectId[];
  transactions: Types.ObjectId[];
 }

 const userSchema : Schema = new Schema<IUser>(
  {
      identificationString: {
          type: String,
          unique: true,
          required: true,
          validate: {
            validator: function(value) {
              // Identification string'in 11 karakterden oluştuğunu kontrol et
              return value.length === 11;
            },
            message: '11 karakterden oluşmalıdır.'
          }

      },
      firstName:{
          type: String,
          required: true,
          index: true
      },
      lastName:{
          type: String,
          required: true
      },
      email:{
          type: String,
          required: true,
          unique: true,
          validate: {
            validator: function(value) {
              // E-posta adresi geçerlilik kontrolü
              const emailRegex =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
              return emailRegex.test(value);
            },
            message: 'Geçerli bir e-posta adresi giriniz.'
          }
      },
      birthDate:{
          type: Date,
          required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
        validate: {
          validator: function(value) {
            // Telefon numarası geçerlilik kontrolü
            const phoneRegex = /^\d{12}$/;
            return phoneRegex.test(value);
          },
          message: 'Geçerli bir telefon numarası giriniz.'
        }
      },
      password:{
          type: String,
          required: true,
          select: false,
          minlength: 6

      },
      adress:{
          type: SchemaTypes.Mixed,
          required: true,
          select: true,

      },
      bankAccounts:[{
              type: Schema.Types.ObjectId,
              required:false,
              ref:'Account'
          }
      ],
      transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
      }]
  },
  {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
  }
)

const UserModel = models.User || model('User', userSchema, 'users')

export default UserModel



