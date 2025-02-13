
export function verifyCPF(value: string){

    if(typeof value !== 'string'){
        return false;
    }

    if(value.length !== 11 || !!value.match(/(\d)\1{10}/)){
        return false;
    }

    const digits = value.split('').map(el => +el);

    function getVerifyingDigit(arr: number[]) {
        const reduced = arr.reduce( (sum, digit, index)=>(sum + digit * (arr.length - index + 1)), 0 );
        return (reduced * 10) % 11 % 10;
    }

    // O CPF é válido se, e somente se, os dígitos verificadores estão corretos
    return getVerifyingDigit(digits.slice(0, 9)) === digits[9]
        && getVerifyingDigit(digits.slice(0, 10)) === digits[10];
}

const teste = verifyCPF('43508967832');
console.log(teste);