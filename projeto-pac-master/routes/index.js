const express = require('express');
const router = express.Router();
const { ensureAuthenticated, passport } = require('../auth');

// Rota de login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/perfil', // Redireciona para a página do usuário em caso de autenticação bem-sucedida
  failureRedirect: '/login', // Redireciona para a página de login em caso de falha na autenticação
}));

/* GET home page. */
router.get('/', async function(req, res) {
  try {
    const results = await global.db.selectEmpresas();
    console.log(results);
    res.render('index', { results });
  } catch (error) {
    res.redirect('/?erro=' + error);
  }
});


/* GET dados page */
router.get('/perfil', ensureAuthenticated, function(req, res) {
  res.render('perfil', { user: req.user });
});

/* ->  ------------------------------------------------------------------------------------------------------*/

/*EDIT ->  ------------------------------------------------------------------------------------------------------*/
router.get('/editar', function(req, res, next) {
  res.render('editar', { title: "Editar", action: "/editar" })
})
/* ->  ------------------------------------------------------------------------------------------------------*/

/*EXCLUIR ->  ------------------------------------------------------------------------------------------------------*/
router.get('/excluir', function(req, res, next) {
  res.render('excluir', { title: "Excluir", action: "/excluir" })
})
/* ->  ------------------------------------------------------------------------------------------------------*/

/*DASH ->  ------------------------------------------------------------------------------------------------------*/
router.get('/dash', function(req, res, next) {
  res.render('dash', { title: "Dashboard da Empresa", action: "/dash" })
})
/* ->  ------------------------------------------------------------------------------------------------------*/



/*SINGIN ->  ------------------------------------------------------------------------------------------------------*/
router.get('/singin', function(req, res, next) {
  res.render('singin', { title: "SingIn", action: "/singin" })
})
/* ->  ------------------------------------------------------------------------------------------------------*/

/*SINGUP ->  ------------------------------------------------------------------------------------------------------*/
router.get('/singup', function(req, res, next) {
  res.render('singup', { title: "SingUp", action: "/singup" })
})
/* ->  ------------------------------------------------------------------------------------------------------*/

/*NEW ->  ------------------------------------------------------------------------------------------------------*/
/* GET new page. */
router.get('/new', function(req, res, next) {
  res.render('new', { title: "Cadastro de Empresa", action: "/new" })
})


/* POST new page. */
router.post('/new', async function(req, res, next) {
  const id_empresa = req.body.id_empresa
  const nome = req.body.nome
  const email = req.body.email
  const cnpj = req.body.cnpj
  const telefone = req.body.telefone
  const patrimonio_liquido = req.body.patrimonio_liquido
  const receita_liquida = req.body.receita_liquida
  const lucro_bruto = req.body.lucro_bruto
  const despesas_vga = req.body.despesas_vga
  const pdi = req.body.pdi
  const da = req.body.da
  const despesas_financeiras = req.body.despesas_financeiras
  const resultado_antes_impostos = req.body.resultado_antes_impostos
  const impostos = req.body.impostos
  const lucro_liquido = req.body.lucro_liquido
  const caixa = req.body.caixa
  const divida = req.body.divida
  const fco = req.body.fco
  const fci = req.body.fci
  const capex = req.body.capex
  const fcf = req.body.fcf
  const pagamento_div_jscp  = req.body.pagamento_div_jscp
  const id_usu = req.body.id_usu
  try { 
    await global.db.insertEmpresa({id_empresa, nome, email, cnpj, telefone, patrimonio_liquido, receita_liquida, lucro_bruto, despesas_vga, pdi, da, despesas_financeiras, resultado_financeiro, resultado_antes_impostos, impostos, lucro_liquido, caixa, divida, fco, fci, capex, fcf, pagamento_div_jscp, id_usu})
    res.redirect('/?new=true'); 
  } catch (error) { 
    res.redirect('/?erro=' + error); 
  }
})

/*->  ------------------------------------------------------------------------------------------------------*/

module.exports = router;