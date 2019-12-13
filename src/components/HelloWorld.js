import Quill from 'quill';
import axios from 'axios';

async function HelloWorld() {
    // const div = document.createElement('div');
    // const h1 = document.createElement('h1');
    // const h1Text = document.createTextNode('Hello Webpack-Babel-Boilerplate!');
    
    // div.className = 'main';
    // h1.appendChild(h1Text);
    // document.body.appendChild(div);
    // div.appendChild(h1);


    // const postId = 1;
    // const post = await getPost(postId);

    // const postTitle = post.title || 'Oops title was null!';
    // const p = document.createElement('p');
    // const pText = document.createTextNode(postTitle);

    // p.appendChild(pText);
    // div.appendChild(p);

    const editor = new Quill('#editor', {
      modules: { toolbar: '#toolbar' },
      theme: 'snow',
    });

    const Delta = Quill.import('delta');
    let change = new Delta();
    editor.on('text-change', (delta) => {
      change = change.compose(delta);
    });

    setInterval(() => {
      if (change.length() > 0) {

        console.log(`getText: ${editor.getText()}`);

        axios.post('/saveAs', { content: editor.getText() })
          .then(response => console.log(response))
          .catch(error => console.log(error));
      }
      change = new Delta();
    }, 5*1000);

    window.onbeforeunload = () => {
      if (change.length > 0) {
        return 'There are unsaved changes. Are you sure you want to leave?';
      }
    }
}

export default HelloWorld;