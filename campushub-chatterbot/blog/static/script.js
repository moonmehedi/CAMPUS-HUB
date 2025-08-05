const inputMessage = document.getElementById('textInput')
const submit =document.getElementById('buttonInput')
const chatbotBox = document.getElementById('chatbot')

submit.addEventListener('click',handleSubmit)


async function handleSubmit(){

    const message = inputMessage.value
    const htmlMessageInsert="<p class='userText'>User: <span>"+message+"</span></p>"
    chatbotBox.innerHTML += htmlMessageInsert
    console.log(inputMessage.value)
 

    // send message to server and get reply
    const response = await fetch('http://127.0.0.1:9000/blog/getResponse/'
        ,{
            method:'POST',
            headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({message:message})
        }
    )

    const data = await response.json()

    const htmlMessageInsert2="<p class='botText'>Chatbot: <span>"+data.message+"</span></p>"
    chatbotBox.innerHTML += htmlMessageInsert2

    inputMessage.value = '';

}