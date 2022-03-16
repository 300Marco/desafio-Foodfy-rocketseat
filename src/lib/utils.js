module.exports = {
    // Idade
    age(timestamp) {
        const today = new Date();
        const birthDate = new Date(timestamp);
    
        // idade
        // 2021 - 1996 = 25
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
    
        // verifica se fiz aniversário ou não
        if(month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1;
        }
        
        return age;
    },
    date(timestamp) {
        const date = new Date(timestamp);

        // yyy
        const year = date.getFullYear();

        // mm
        const month = `0${date.getMonth() + 1}`.slice(-2);

        // dd
        const day = `0${date.getDate()}`.slice(-2);

         // hour
         const hour = date.getHours();

         // minutes
         const minutes = date.getMinutes();

        return {
            day, 
            month, 
            year,
            hour,
            minutes,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    }
    // date(timestamp) {
    //     const date = new Date(timestamp);

    //     // yyy
    //     const year = date.getUTCFullYear();

    //     // mm
    //     const month = `0${date.getUTCMonth() + 1}`.slice(-2);

    //     // dd
    //     const day = `0${date.getUTCDate()}`.slice(-2);

    //     return {
    //         day, 
    //         month, 
    //         year,
    //         iso: `${year}-${month}-${day}`,
    //         birthDay: `${day}/${month}`,
    //         format: `${day}/${month}/${year}`
    //     }
    // }
}