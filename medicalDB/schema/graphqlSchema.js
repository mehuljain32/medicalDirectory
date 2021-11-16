const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList,
    GraphQLSchema, GraphQLNonNull } = graphql;
// const test = require('../modules/test').test;
const medicineData = require('../modules/userMedicines');
const mySqlConnector = require('./schema/connector/mySqlConnector');
const mySqlConfig = require('../config/mySqlConfig.json');

mySqlConnector = new mySqlConnector();

//open the connection with database
mySqlInstance = mySqlConnector.connect(
    mySqlConfig.mySqlInstance,
    // logger
    null
);


const MedicineType = new GraphQLObjectType({
    name: 'Medicine',
    fields: () => ({
        name: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
    })
})

//new graphql object type for user and his medicines data
const UserType = new GraphQLObjectType({
    name: 'Users',
    fields: () => ({
        id: {  type: GraphQLID },
        name: { type: GraphQLString },
        address: {  type: GraphQLString },
        medicines: { type: new GraphQLNonNull(MedicineType) } 
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID
                }
                // name: {
                //     type: GraphQLString
                // }
            },
            resolve(parent, args) {
                return medicineData.getCustomerData(parent, args, mySqlInstance);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields:{
        addCustomer: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                address: {  type: new GraphQLNonNull(GraphQLString)},
                medicines: {    type: new GraphQLNonNull(MedicineType)}
            },
            resolve(parent, args){
                let name = args.name;
                let address = args.address;
                let medicines = args.medicines;
                return medicineData.saveCustomerData(name, address, 
                    medicines, mySqlInstance);
            }
        }
    }
})

// let test = (parent, args) => {
//     return "Welcome To GraphQL"
// }

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});