// let logger = require('')
let medicineData = (parent, args, mySqlInstance) => {
    try {
        //id: args.id
        //name: args.name
        //query the db and find the medicines and address for the given name and id
        //and return them in the response
        let name = "Mehul";
        let address = "bazarpeth";
        let medicines = { name: ["a", "b"] };
        let query = `SELECT name, address, medicine FROM user_medicines WHERE
        id = ? AND name = ?`;
        let params = [args.id, args.name];
        connection.promise().query(query, params)
            .then((res) => {
                let result = {
                    name: "",
                    address: "",
                    medicines: {name:[]}
                };
                if(res.length > 0){
                    result.name = res[0].name;
                    result.address = res[0].address;

                    //one user can have multiple medicines
                    for(let obj of res){
                        result.medicines.name.push(obj.medicine);
                    }

                }
                return result;
                
            })
            .catch((err) => {
                throw new Error(err);
            })
    } catch (error) {
        //log error
        return error;
    }
}

module.exports.medicineData = medicineData;