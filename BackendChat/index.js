const { json } = require('express');
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

app.get('/course/:course', (req, res) => {
  const courses = './JSON/courses.json';
  const titleCourse = req.params.course.toLowerCase();
  // req.body.titleCourse.toLowerCase();
  fs.readFile(courses, 'utf-8', (err, data) => {
    

    if (err) {
      console.error('Erro ao ler o arquivo JSON:', err);
      res.status(500).send('Erro ao ler o arquivo JSON.');
    } else {
      try {
        const cursos = JSON.parse(data);
        const cursoEncontrado = cursos.find(curso => curso.titleCourse.toLowerCase() === titleCourse.toLowerCase());
        console.log(cursoEncontrado)

        if (cursoEncontrado) {
          // result= 
          const result =  "Titulo:" + cursoEncontrado.titleCourse + "link" + cursoEncontrado.linkCourse;
          res.json(result);

        } else {
          res.status(404).send('Curso não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao analisar o arquivo JSON:', error);
        res.status(500).send('Erro ao analisar o arquivo JSON.');
      }
    }
  });
});

// app.get('/course/:course', (req, res) => {
//   const courses = './JSON/courses.json';
//   const titleCourse = req.params.course.toLowerCase();

//   fs.readFile(courses, 'utf-8', (err, data) => {
//     if (err) {
//       console.error('Erro ao ler o arquivo JSON:', err);
//       res.status(500).send('Erro ao ler o arquivo JSON.');
//     } else {
//       try {
//         const cursos = JSON.parse(data);
//         const cursoEncontrado = cursos.find(curso => curso.titleCourse.toLowerCase() === titleCourse.toLowerCase());

//         if (cursoEncontrado) {
//           const result = {
//             title: cursoEncontrado.titleCourse,
//             link: cursoEncontrado.linkCourse
//           };
//           res.json(result);
//         } else {
//           res.status(404).send('Curso não encontrado.');
//         }
//       } catch (error) {
//         console.error('Erro ao analisar o arquivo JSON:', error);
//         res.status(500).send('Erro ao analisar o arquivo JSON.');
//       }
//     }
//   });
// });

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
