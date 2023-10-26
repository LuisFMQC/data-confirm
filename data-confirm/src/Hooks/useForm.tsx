import React from "react";

interface TypeItem {
  regex?: RegExp;
  message: string;
  validate?: Function;
}

const types: Record<any, TypeItem> = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um e-mail válido",
  },
  number: {
    regex: /^\d+$/,
    message: "Utilize apenas números",
  },
  telefone: {
    regex: /\([1-9]\d\)\s9?\d{4}-\d{4}$/,
    message: "Digite um telefone válido",
  },
  cpf: {
    validate: (cpf: string): Boolean => {
        cpf = cpf.replace(/[^\d]+/g, "");

        if (cpf.length !== 11) {
          return false;
        }

        if (/^(\d)\1+$/.test(cpf)) {
          return false;
        }

        // Calcula o primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
          soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digito1 = resto >= 10 ? 0 : resto;

        if (parseInt(cpf.charAt(9)) !== digito1) {
          return false;
        }

        // Calcula o segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
          soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digito2 = resto >= 10 ? 0 : resto;

        return parseInt(cpf.charAt(10)) === digito2;
    },
    message: "CPF ou Email inválido",
  },
    token: {
      regex: /^\d{6}$/,
      message: "Token inválido"
    }
};

type Types = keyof typeof types;

const useForm = (type: Types) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);


  function validate(value: string){
    if(type === false) return true;
    if(value.length === 0) {
        setError('Preencha um valor.');
        return false;
    } else if(types[type] && !types[type].regex?.test(value)){
        setError(types[type].message);
    } else {
        setError(null);
        return true;
    }
}
  // function validate(value: string) {
  //   if (!type) return true;
  //   if (value.length === 0) {
  //     setError("Preencha um valor.");
  //     return false;
  //   } else if (
  //     types[type] &&
  //     types[type].regex &&
  //     !types[type].regex?.test(value)
  //   ) {
  //     console.log(value)
  //     setError(types[type].message);
  //   } else if (
  //     types[type] &&
  //     types["cpf"].validate &&
  //     !types["cpf"]["validate"](value)
  //   ) {
  //     setError(types[type].message);
  //   } else {
  //     setError(null);
  //     return true;
  //   }
  // }

  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (type === "email" || type === "number" || type === "" || type === "token") {
      if (error) validate(target.value);
      setValue(target.value);
    } else if (type === "telefone") {
      const formatarTelefone = (valor: string) => {
        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/^([1-9]\d)/, "($1) ");
        valor = valor.replace(/(\s9?\d{4})(\d{4})$/, "$1-$2");

        return valor;
      };
      setValue(formatarTelefone(target.value));
    } else if (type === "cpf") {
      const formatarCPF = (cpf: string) => {
        const regex = /[a-zA-z]/;
        if (regex.test(cpf)) {
          console.log("Entrou na verificação de email");
          return cpf;
        }
        cpf = cpf.replace(/\D/g, "");
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      };
      setValue(formatarCPF(target.value));
    }
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;