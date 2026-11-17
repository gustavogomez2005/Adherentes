import {conectar} from '../database/conexion.js';
const bdd = await conectar();

export const altasSocios = async (pet, resp)=>{
    const id = parseInt( pet.body.nroid);
    const nom = pet.body.nom;
    const nommat = pet.body.nomMaterno;
    const nompat = pet.body.nomPaterno;
    const dni = pet.body.nroDni;
    const fechaing = pet.body.fing;

    try {
        let altaSocioSql = "INSERT INTO adherentes (idadherentes,dni,nom,apemat,apepat,fechaing) VALUES ('"+ id +"','"+ dni +"','"+ nom +"','"+ nommat +"','"+ nompat +"','"+ fechaing+"');";    
        console.log(altaSocioSql);
        const registro = await bdd.query(altaSocioSql);
        resp.send(`Socio ingresado correctamente`);
    } catch (error) {
        console.log(`Error al ingresar el socio \n ${error}`);
    }
    

}

export const mostrarSocios = async (pet, resp)=>{
    try {
        let mostrarSql = "SELECT idadherentes, nom, dni, apemat, apepat, fechaing FROM adherentes;";
        const [registros, campos] = await bdd.query(mostrarSql);
        resp.send(registros)
    } catch (error) {
        console.log(`No puede mostrar los socios`);
    }
}


export const modificarSocios = async (pet, resp)=>{
    const id = parseInt( pet.body.nroid);
    const nom = pet.body.nom;
    const nommat = pet.body.nomMaterno;
    const nompat = pet.body.nomPaterno;
    const dni = pet.body.nroDni;
    const fechaing = pet.body.fing;
    
    try {
        let actsql = "UPDATE adherentes SET dni = '"+ dni +"', nom = '"+ nom +"', apemat = '"+ nommat +"', apepat = '"+ nompat +"', fechaing = '"+ fechaing+"' WHERE idadherentes = '"+ id +"';";
        const registro = await bdd.query(actsql);
        console.log(registro);
        console.log(`datos del socio actualizado`);
    } catch (error) {
        console.log(`No se pudo actualizar los datos del socio\n ${error}`);
    }
}


export const eliminarSocios = async (pet, resp)=>{
    const id = parseInt( pet.params.id);

    try {
        let eliminarsql = "DELETE FROM adherentes WHERE idadherentes = '"+ id +"';";
        const registro = await bdd.query(eliminarsql);
        console.log(registro);
        console.log(`datos del socio eliminado correctamente`);
    } catch (error) {
        console.log(`No se pudo eliminar al socio\n ${error}`);
    }
    

}