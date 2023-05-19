// // const { error } = require('console');
// // const fs = require('fs');


// // // const courses = require('./JSON/courses.json');
// // // console.log(courses);

// // fs.readFile('./JSON/courses.json','utf-8',(error,data) =>{

// //     try{
// //     const courses = JSON.parse(data);
// //     console.log(courses.titleCourse); 
// //     }catch(e){
// //         console.log(e);
// //     }
    
// // })

// const express = require('express');
// const server = express();

// server.






// server.listen(3000);

const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Rota para ler o arquivo JSON
app.get('/course', (req, res) => {
  const courses = './JSON/courses.json';

  fs.readFile(courses, 'utf-8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo JSON:', err);
      res.status(500).send('Erro ao ler o arquivo JSON.');
    } else {
      try {
        const course = JSON.parse(data);
        res.json(course);
      } catch (error) {
        console.error('Erro ao analisar o arquivo JSON:', error);
        res.status(500).send('Erro ao analisar o arquivo JSON.');
      }
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
