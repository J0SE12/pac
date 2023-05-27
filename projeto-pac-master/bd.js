const mysql = require('mysql2/promise');

async function connect() { 
    if (global.connection && global.connection.state !== 'disconnected') 
    return global.connection; 
    const connection = await mysql.createConnection({ 
        host: 'localhost', 
        port: 3306, 
        user: 'root', 
        password: '', 
        database: 'crud1' 
    }); 
    console.log('Conectou no MySQL!'); 
    global.connection = connection; 
    return global.connection; 
} 

async function selectEmpresas() { 
    const conn = await connect(); 
    const [rows] = await conn.query('SELECT * FROM empresas;'); 
    return rows;
} 

async function selectUsuarios() { 
  const conn = await connect(); 
  const [rows] = await conn.query('SELECT * FROM usuarios;'); 
  return rows;
}

async function insertUsuarios(usuario) { 
  const conn = await connect(); 
  const sql = "INSERT INTO usuarios(usuario.id_usuario, usuario.nome_usu, usuario.email_usu, usuario.desc_usu, usuario.telef_usu) VALUES (?,?,?,?,?);"; 
  return await conn.query(sql, [usuario.id_usuario, usuario.nome_usu, usuario.email_usu, usuario.desc_usu, usuario.telef_usu]); 
} 

async function insertEmpresas(empresa) { 
    const conn = await connect(); 
    const sql = "INSERT INTO empresas(id_empresa, nome, email, cnpj, telefone, patrimonio_liquido, receita_liquida, lucro_bruto, despesas_vga, pdi, da, resultado_financeiro, resultado_antes_impostos, impostos, lucro_liquido, caixa, divida, fco, fci, capex, fcf, pagamento_div_jscp, id_usu) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"; 
    return await conn.query(sql, [empresa.id_empresa, empresa.nome, empresa.email, empresa.cnpj, empresa.telefone, empresa.patrimonio_liquido, empresa.receita_liquida, empresa.lucro_bruto, empresa.despesas_vga, empresa.pdi, empresa.da, empresa.resultado_financeiro, empresa.resultado_antes_impostos, empresa.impostos, empresa.lucro_liquido, empresa.caixa, empresa.divida, empresa.fco, empresa.fci, empresa.capex, empresa.fcf, empresa.pagamento_div_jscp, empresa.id_usu]); 
} 

//Função de Margem - Lucro Bruto / Receita Líq.
async function MLucBruRecLiq(callback) {
    const query = 'SELECT lucro_bruto, receita_liquida FROM empresa';
    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
  
      const lucrobruto = results[0].lucro_bruto;
      const receitaliquida = results[0].receita_liquida;
      const resultado = lucrobruto/receitaliquida; // Aqui, realizamos o cálculo
  
      callback(null, resultado);
    });
  }

//Função de Margem - P&D/Lucro Bruto
async function MPDLucBru(callback) {
    const query = 'SELECT pdi, lucro_bruto FROM empresa';
    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
  
      const pdi = results[0].pdi;
      const lucrobruto = results[0].lucro_bruto;
      const resultado = pdi/lucrobruto; // Aqui, realizamos o cálculo
  
      callback(null, resultado);
    });
} 

//Função de Margem - Margem - D&A/Lucro Bruto
async function MDALucBru(callback) {
    const query = 'SELECT da, lucro_bruto FROM empresa';
    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
  
      const da = results[0].da;
      const lucrobruto = results[0].lucro_bruto;
      const resultado = da/lucrobruto; // Aqui, realizamos o cálculo
  
      callback(null, resultado);
    });
} 

//Função de EBITDA	
async function EBITDA(callback) {
    const query = 'SELECT lucro_liquido, impostos, despesas_financeiras, da FROM empresa';
    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
  
      const lucro_liquido = results[0].lucro_liquido;
      const impostos = results[0].impostos;
      const despesas_financeiras = results[0].despesas_financeiras;
      const da = results[0].da;
      const resultado = lucro_liquido-impostos-despesas_financeiras-da; // Aqui, realizamos o cálculo
  
      callback(null, resultado);
    });
} 

//Função de EBITDA/Receita Líq.	
async function EBITDARecLiq(callback) {
    const query = 'SELECT receita_liquida FROM empresa';
    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
  
      
    const ebitida = EBITIDA
      const receita_liquida = results[0].receita_liquida;
      const resultado = ebitida/receita_liquida; // Aqui, realizamos o cálculo
  
      callback(null, resultado);
    });
} 

//Função de EBIT	
async function EBIT(callback) {
    const query = 'SELECT lucro_liquido, impostos, despesas_financeiras FROM empresa';
    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
  
      
      const lucro_liquido = results[0].lucro_liquido;
      const impostos = results[0].impostos;
      const despesas_financeiras = results[0].despesas_financeiras;
      const resultado = lucro_liquido-impostos-despesas_financeiras; // Aqui, realizamos o cálculo
  
      callback(null, resultado);
    });
} 

//Função de EBIT/Receita Líq.
async function EBITRecLiq(callback) {
    const query = 'SELECT receita_liquida FROM empresa';
    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
  
      
      const ebit = EBIT
      const receita_liquida = results[0].receita_liquida;
      const resultado = ebit/receita_liquida; // Aqui, realizamos o cálculo
  
      callback(null, resultado);
    });
} 

//Função de Despesas com Juros/EBIT
async function DespEBIT(num1, num2) {
    const query = 'SELECT despesas_financeiras FROM empresa';
    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
  
      
      const ebit = EBIT
      const despesas_financeiras = results[0].despesas_financeiras;
      const resultado = despesas_financeiras/ebit; // Aqui, realizamos o cálculo
  
      callback(null, resultado);
    });
} 

//Função de Margem de Lucro antes dos impostos
async function MLucAntImp(callback) {
    const query = 'SELECT resultado_antes_impostos, receita_liquida FROM empresa';
    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
  
      
      const resultado_antes_impostos = results[0].resultado_antes_impostos;
      const receita_liquida = results[0].receita_liquida;
      const resultado = resultado_antes_impostos/receita_liquida; // Aqui, realizamos o cálculo
  
      callback(null, resultado);
    });
} 

//Função de Margem - Lucro Líq/Receita
async function MLucLiqRec(num1, num2) {
    const query = 'SELECT resultado_antes_impostos, receita_liquida FROM empresa';
    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
  
      
      const resultado_antes_impostos = results[0].resultado_antes_impostos;
      const receita_liquida = results[0].receita_liquida;
      const resultado = resultado_antes_impostos/receita_liquida; // Aqui, realizamos o cálculo
  
      callback(null, resultado);
    });
    
} 

//Função de ROE
async function ROE(callback) {
    const query = 'SELECT lucro_liquido, patrimonio_liquido FROM empresa';
    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
  
      
      const patrimonio_liquido = results[0].patrimonio_liquido;
      const lucro_liquido= results[0].lucro_liquido;
      const resultado = lucro_liquido/patrimonio_liquido; // Aqui, realizamos o cálculo
  
      callback(null, resultado);
    });
    
} 

//Função de Dívida Líquida/EBITDA
async function DivLiqEBITIDA(num1, num2) {
    
    
    const sub = divida-caixa
    return sub/EBITIDA;
} 

//Função de FCT
async function FCT(callback) {
    const query = 'SELECT fco, fci, fcf FROM empresa';
    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
  
      
      const fco = results[0].fco;
      const fci= results[0].fci;
      const fcf= results[0].fcf;
      const resultado = fco/fci/fcf; // Aqui, realizamos o cálculo
  
      callback(null, resultado);
    });
    
} 

//Função de FCL
async function FCLCAPEX(callback) {
    const query = 'SELECT fco, capex FROM empresa';
    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
  
      
      const fco = results[0].fco;
      const capex= results[0].capex;
      const resultado = fco/capex; // Aqui, realizamos o cálculo
  
      callback(null, resultado);
    });
    
    
} 

//Função de Capex/FCO	
async function CapexFCO(callback) {
    const query = 'SELECT fco, capex FROM empresa';
    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
  
      
      const fco = results[0].fco;
      const capex= results[0].capex;
      const resultado = capex/fco; // Aqui, realizamos o cálculo
  
      callback(null, resultado);
    });
    
} 

//Função de Capex/D&A	
async function CapexDA(callback) {
    const query = 'SELECT capex, da FROM empresa';
    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
  
      
      const da = results[0].da;
      const capex= results[0].capex;
      const resultado = capex/da; // Aqui, realizamos o cálculo
  
      callback(null, resultado);
    });
    
    
} 

//Função de Capex/Lucro Líq.
async function CapexLucLiq(num1, num2) {
    return capex/lucro_liquido;
} 

//Função de Payout	
async function Payout(num1, num2) {
    return pagamento_div_jscp/lucro_liquido;
} 

//Função de Tributos/Receita
async function TribRec(num1, num2) {
    return impostos/receita_liquida;
} 

//Função de Tributos/Renda
async function TribRend(num1, num2) {
    return impostos/resultado_antes_impostos;
} 

connect(); 

module.exports = { selectEmpresas, selectUsuarios, insertEmpresas, insertUsuarios}