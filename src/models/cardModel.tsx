import { Schema, Types, model, models } from "mongoose"

const CARD_TYPES = [
    'DEBIT',
    'CREDIT'
]
const PROCESSING_METHODS = [
    'VISA',
    'MASTERCARD',
    'AMERICAN EXPRESS',
    'DISCOVER'
]

export interface Card{
    owner:Types.ObjectId
    firstName:String
    lastName:String
    number:String
    type:String
    processingMethod:String
    expireYear:String
    expireMonth:String 
    cvv:String
    allowDigitalTransactions: boolean
    cardLimit: number
    associatedBankAccount: Types.ObjectId
}

const CardModelSchema = new Schema<Card>({
    owner:{
        type: Schema.Types.ObjectId,
        required: true
    },
    firstName:{
        type: String,
        required: true,
        validate:{
            validator: function(value : String){
                return !(value === value.replaceAll(' ',''))
            },
            message:'firstNameCannotBeEmpty'
        }
    },
    lastName:{
        type: String,
        required: true,
        validate:{
            validator: function(value : String){
                return !(value === value.replaceAll(' ',''))
            },
            message:'lastNameCannotBeEmpty'
        }
    },
    number:{
        type: String,
        required: true,
        validate:{
            validator: function(value){
                const regex = /^\d{16}$/
                return regex.test(value)
            },
            
        }
    },
    type:{
        type: String,
        required: true,
        validate:{
            validator: function(value){
                if(CARD_TYPES.indexOf(value) == -1)
                    return false
                return true
                },
            message:'invalidCardType'
        }
    },
    processingMethod:{
        type: String,
        required: true,
        validate:{
            validator: function(value){
                if(PROCESSING_METHODS.indexOf(value) == -1)
                    return false
                return true
            },
            message:'invalidProcessingMethod'
        }
    },
    expireYear:{
        type: String,
        required: true,
        validate:{
            validator: function(value){
                const regext = /^\d{4}$/
                if(!regext.test(value))
                    return false
                if(Number(value) <= new Date().getFullYear())
                    return false
                return true
            },
            message:'invalidExpireYear'
        }
    },
    expireMonth:{
        type: String,
        required: true,
        validate:{
            validator: function(value){
                const regext = /^\d{2}$/
                if(!regext.test(value))
                    return false
                if(!(Number(value)>= 1 && Number(value) <= 12))
                    return false 
                return true
            },
            message:'invalidExpireMonth'
        }
    },
    cvv:{
        type: String,
        required: true,
        validate:{
            validator: function(value){
                const regext = /^\d{3}$/
                if(!regext.test(value))
                    return false
                return true
            },
            message:'invalidCVV'
        }
    },
    allowDigitalTransactions:{
        type: Boolean,
        required: false,
        default: true
    },
    cardLimit:{
        type: Number,
        required: true,
        default: -1
    },
    associatedBankAccount:{
        type: Schema.Types.ObjectId,
        required: true
    } 
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
})

const CardModel = models.CardModel || model('Card', CardModelSchema, 'cards')

export default CardModel