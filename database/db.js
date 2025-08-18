import sql from 'mssql';

const config = {
    server: '(localdb)\\MSSQLLocalDB',
    database: 'testdb',
    options: {
        encrypt: true, //for azure
        trustServerCertificate: true
    }
};

let pool;

//connect function
export async function connectDB(){
    try {
        if(!pool){
            pool = await sql.connect(config);
            console.log('connected to database');
        } 
        return pool;
    } catch (error) {
        console.error('Database connection failed!!: ', error);
    }
}

export { sql };