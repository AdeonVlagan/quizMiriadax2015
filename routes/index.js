var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', sessionController.validSession, function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

router.get('/Author', sessionController.validSession, function(req, res) {
  res.render('Author', { title: 'Autor', errors: []});
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId
router.param('commentId', commentController.load); // autoload: :coomentId

// Definición de rutas de sesion
router.get('/login', sessionController.new);  // formulario login
router.post('/login', sessionController.create); // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

// Definición de rutas de /quizes
router.get('/quizes',                      sessionController.validSession, quizController.index);
router.get('/quizes/:quizId(\\d+)',        sessionController.validSession, quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', sessionController.validSession, quizController.answer);
router.get('/quizes/new',                  sessionController.validSession, sessionController.loginRequired, quizController.new);
router.post('/quizes/create',              sessionController.validSession, sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.validSession, sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',        sessionController.validSession, sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',     sessionController.validSession, sessionController.loginRequired, quizController.destroy);


// Definición de rutas de comentarios
router.get("/quizes/:quizId(\\d+)/comments/new", sessionController.validSession, commentController.new);
router.post("/quizes/:quizId(\\d+)/comments", sessionController.validSession, commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',sessionController.validSession, sessionController.loginRequired, commentController.publish);

module.exports = router;
