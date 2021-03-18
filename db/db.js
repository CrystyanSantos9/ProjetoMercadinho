/*
connection pool, onde um objeto irá gerenciar as nossas conexões, 
para abrir, fechar e reutilizar conforme possível. 
Vamos guardar este único pool em uma variável global, 
que testamos logo no início da execução para garantir que se já tivermos um pool, que vamos utilizar o mesmo.
*/

require('dotenv/config');
user=process.env.DB_USER
database=process.env.DB_NAME
pass=process.env.DB_PASS
port=process.env.DB_PORT


async function connect() {
    if (global.connection)
        return global.connection.connect();
        
        const { Pool } = require('pg');

    const pool = new Pool({
        //formato postgres://usuario:senha@servidor:porta/banco
        connectionString: `postgres://${user}:${pass}@localhost:${port}/${database}`
    });
 
    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");
 
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();
 
    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

async function selectUsers() {
    const client = await connect();
    const res = await client.query('SELECT * FROM funcionarios');
    return res.rows;
}

// async function selectSells() {
//     const client = await connect();
//     const res = await client.query('SELECT * FROM vendas');
//     return res.rows;
// }

async function selectOneUser(id) {
    const client = await connect();
    const sql = 'SELECT * FROM funcionarios WHERE id=$1';
    const value = [id]
    const res = await client.query(sql, value);
    return res.rows;
}

async function selectSales() {
    const client = await connect();
    const res = await client.query('SELECT * FROM vendas');
    return res.rows;
}

/*
primeiro, o SQL possui conteúdo dinâmico, que são os valores a serem inseridos na linha 
da tabela clientes. E embora seja muito tentado concatenar a string SQL na mão, não faça isso sob risco de SQL Injection!

Ao invés disso, coloque $1, $2, etc no lugar dos campos e quando chamar o client.query, 
o segundo parâmetro aceita um array de valores que serão corretamente substituídos na sua string SQL, já prevendo SQL Injection.
*/
async function insertUsers(user){
    const client = await connect();
    const sql = 'INSERT INTO funcionarios(funcionario_codigo,funcionario_nome,funcionario_situacao,funcionario_comissao,funcionario_cargo,data_criacao,data_atualizacao) VALUES ($1,$2,$3,$4,$5,$6,$7);';
    const values = [user.codigo, user.nome, user.situacao,user.comissao,user.cargo,user.criacao,user.atualizacao];
    return await client.query(sql, values);
}

async function updateUser(id, user){
    const client = await connect();
    const sql = 'UPDATE funcionarios SET funcionario_codigo=$1, funcionario_nome=$2, funcionario_situacao=$3, funcionario_comissao=$4, funcionario_cargo=$5, data_criacao=$6, data_atualizacao=$7 WHERE id=$8';
    const values = [user.codigo, user.nome, user.situacao, user.comissao, user.cargo, user.criacao, user.atualizacao, id];
    return await client.query(sql, values);
}

async function deleteUser(id){
    const client = await connect();
    const sql = 'DELETE FROM funcionarios WHERE id=$1;';
    return await client.query(sql, [id]);
}


 
module.exports = { selectUsers, insertUsers, updateUser, deleteUser, selectSales, selectOneUser}