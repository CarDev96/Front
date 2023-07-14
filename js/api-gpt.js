var apiAxios =  axios.create({
    baseURL: 'http://192.168.3.144:8085/'
  });
var ths = this;
var token_api = '';

/* (function(){
    
}); */

$(document).ready(function() {
    ths.getToken();
  });

function getToken(){

    apiAxios.get('/api/get-token')
      .then(function (response) {
        ths.token_api = response.data.token;
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
}


function getParams(){
    let question = document.querySelector("#question").value;
    
    this.getApiGpt(question);

}

function getApiGpt(_question){

    apiAxios.get('/api/question?text='+_question)
      .then(function (response) {
        let answer = response.data;
        document.querySelector('#loading').classList.remove('d-none');
        ths.addComment({'question':_question,answer});
        document.querySelector("#question").value='';
        document.querySelector('#loading').classList.add('d-none');

      })
      .catch(function (error) {
        console.log(error);
      });

}

function addComment(_data){

    let html_item = `<row>
                        <div class="col-lg-10 col-10 mb-lg-0 ms-auto p-1">
                            <div class="form-floating">
                                <textarea class="form-control" disabled id="message" oninput="autoResize(this)" name="message" rows="5"
                                    placeholder="RRHH">${_data.question}</textarea>
                                <label for="floatingTextarea">Usuario RRHH</label>
                            </div>
                        </div>
                    </row>`;

    let html = document.createElement('div');
    html.innerHTML = html_item;

    document.querySelector('#content-conversation').appendChild(html);

    html_item = `<row>
                    <div class="col-lg-10 col-10 mb-lg-0 p-1">
                        <div class="form-floating">
                            <textarea class="form-control"  disabled id="txt_answer" oninput="autoResize(this)" name="message" rows="5" 
                                placeholder="TalentAI">${_data.answer}</textarea>
                            <label for="floatingTextarea">TalentAI</label>
                        </div>
                    </div>
                </row>`;
    
    html = document.createElement('div');
    html.innerHTML = html_item;

    document.querySelector('#content-conversation').appendChild(html);

}

function autoResize(textarea) {
    textarea.style.height = 'auto'; // Restablecer la altura para calcular la altura correcta
    textarea.style.height = textarea.scrollHeight + 'px'; // Establecer la altura en función del contenido
  }