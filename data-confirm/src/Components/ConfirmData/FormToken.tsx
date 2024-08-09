import React from 'react'
import Input from '../Form/Input'
import useForm from '../../Hooks/useForm'
import styles from './FormToken.module.css'
import axios from 'axios'
import Modal from 'react-modal';

const FormToken = () => {
  const token = useForm('token');
  const params = new URLSearchParams(window.location.search);
  const param: string | null = params.get("param");
  const nome: string | null = params.get("nome");
  const data: string | null = params.get("data");
  const hora: string | null = params.get("hora");
  const senha: string | null = params.get("senha");
  // const idCliente = params.get("idcliente");
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  let el: undefined;
  const key = 'token123@abc'

  async function handleSubmit(e: any) {
    e.preventDefault();
    
    if(token.validate()){
      setLoading(true)
      const requestBody = {
        param: param,
        token: Number(token.value)
        }
      console.log(JSON.stringify(requestBody))
      const response = await axios({
        url: "https://apikonsistwpp.ngrok.io/registrotoken",
        method: 'POST',
        headers: {
        // "Accept": "*/*",
        // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUwLCJ1c2VybmFtZSI6Im5ldXJvbWFzdGVyIiwiaWF0IjoxNjgyNjI0NjU3fQ.k2RgBBdJd58TJXZgyf0wUpGMXKhgXlCixg6242FiASw",
          "Content-Type": "application/json" 
        },
        data: JSON.stringify(requestBody)
        })
        if(response.status === 201) {
          setSent(true)
        };
    }
  }

  async function handleCloseModal(){
    window.close();
    setSent(false);
  }

  return (
    <section className={styles.containerMain}>
      <Modal
        appElement={el}
        className={styles.modal}
        isOpen={sent}
        onRequestClose={() => handleCloseModal()}
        ariaHideApp={true}
      >
        <h2>
          Token enviado com sucesso
          <span>!</span>
        </h2>
        <button onClick={() => handleCloseModal()}>Fechar</button>
      </Modal>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <p><span>Paciente: </span>{nome}</p>
          <p><span>Data: </span>{data?.replace
          (/-/g, '/')}</p>
          <p><span>Hora: </span>{hora}</p>
          <p><span>Senha de autorização: </span>{senha}</p>
        </div>
        
        <p>Preencha o <span>TOKEN</span> no campo abaixo:</p>
        <Input 
          label="Token"
          placeholder='Digite o token aqui...'
          type="text"
          name="token"
          maxLength={6}
          {...token}
        />
        {loading ? <button disabled className={styles.submitButtonLoading}>Enviando...</button> : <button className={styles.submitButton}>Enviar</button>}
      </form>
    </section>
  )
}

export default FormToken