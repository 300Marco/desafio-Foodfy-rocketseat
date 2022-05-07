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
    },
    passwordResetEmail(token, name) {
        return `
            <div class="">
            <div class="aHl"></div>
            <div id=":2v" tabindex="-1"></div>
            <div id=":1p" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0.">
                <div id=":1q" class="a3s aiL msg-8118325840975667211"><u></u>
        
        
        
        
        
                    <div width="100%" style="padding:0px;height:100%;width:100%;margin:0px">
                        <div style="display:none;font-size:0;line-height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;color:#ffffff">
        
        
        
        
        
        
        
                            Perdeu a senha?
        
        
        
                            Clique no link abaixo, para cadastrar uma nova senha.
        
        
        
        
                            Cadastrar nova senha
        
        
        
        
                            Descadastrar
        
                            Editar cadastro
        
                            Versão web
        
                            Belo Horizonte MG
        
                            Enviado por para <a href="mailto:casa.testes300@gmail.com" target="_blank">casa.testes300@gmail.com</a>
        
        
        
        
        
        
        
                        </div>
                        <div style="background:#ffffff">
                            <div style="width:1px;height:1px"></div>
                        </div> <img src="https://ci5.googleusercontent.com/proxy/ju2rk-Fhvai5LlA4o7HGgq25E-SJ4lP4qKqvg5-deJSmomjL1mLM0ds5rJU4B2XSWtvOMDLWxL56DFDs7AFikAu36TgoqigqeAvLn_nW43qa1dBrrd-qU12fruqTsL_yYWbrE6drAcK-uIrOYHw5tKHokz6Ku3ZH7-jtY5H19AV_tP1x83Lpg8VQAgKykH8dGbT2WlbVaQSSIK928g=s0-d-e1-ft#https://22.idmkt7.com/stats.php?l=5baa6c851331fb78672b6aa0cb4dfc5f&amp;u=d5a6d4bafa&amp;ca_id=2&amp;cl_id=1359433&amp;l_id=1&amp;m_id=9468306&amp;hf=2256&amp;g=1&amp;i=1" style="width:3px!important;height:2px!important;overflow:hidden;border:0px solid transparent;margin:0;line-height:2px" width="3" height="2" align="middle" border="0" alt="" class="CToWUd" jslog="138226; u014N:xr6bB; 53:W2ZhbHNlXQ..">
                        <div>
                            <div>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto;background-color:rgb(242,242,242);background-position:center center;background-repeat:no-repeat;background-size:cover">
                                    <tbody>
                                        <tr id="m_-8118325840975667211601c7379-96b5-9dc5-3a0e-21e840f58a91">
                                            <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                                <div>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="m_-8118325840975667211email-container" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top" width="100%" dir="ltr" bgcolor="transparent" style="background-color:transparent;padding:0px 40px">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th valign="top" class="m_-8118325840975667211stack-column-center m_-8118325840975667211columns" width="100%" style="font-weight:400">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td dir="ltr" valign="top" style="padding:0px">
                                                                                                    <table align="center" style="border-spacing:0px;table-layout:fixed;margin:0px auto;width:33%;min-width:33%;max-width:33%;border-collapse:separate!important" width="33%">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td style="font-size:0px;height:25px;line-height:25px" height="25px">
                                                                                                                    &nbsp;</td>
        
                                                                                                            </tr>
        
                                                                                                            <tr>
                                                                                                                <td style="border-top:1px solid transparent">
                                                                                                                </td>
        
                                                                                                            </tr>
        
                                                                                                            <tr>
                                                                                                                <td style="font-size:0px;height:25px;line-height:25px" height="25px">
                                                                                                                    &nbsp;</td>
        
                                                                                                            </tr>
        
                                                                                                        </tbody>
        
                                                                                                    </table>
                                                                                                </td>
        
                                                                                            </tr>
        
                                                                                        </tbody>
        
                                                                                    </table>
                                                                                </th>
                                                                            </tr>
        
                                                                        </tbody>
        
                                                                    </table>
                                                                </td>
        
                                                            </tr>
        
                                                        </tbody>
        
                                                    </table>
                                                </div>
                                            </td>
        
                                        </tr>
        
                                        <tr id="m_-8118325840975667211b6d1142a-651c-754d-8580-1716c54eb756">
                                            <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                                <div>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="m_-8118325840975667211email-container" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff" style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th valign="top" class="m_-8118325840975667211stack-column-center m_-8118325840975667211columns" width="100%" style="font-weight:400">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td dir="ltr" valign="top" style="padding:0px">
                                                                                                    <table align="center" style="border-spacing:0px;table-layout:fixed;margin:0px auto;width:33%;min-width:33%;max-width:33%;border-collapse:separate!important" width="33%">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td style="font-size:0px;height:25px;line-height:25px" height="25px">
                                                                                                                    &nbsp;</td>
        
                                                                                                            </tr>
        
                                                                                                            <tr>
                                                                                                                <td style="border-top:1px solid transparent">
                                                                                                                </td>
        
                                                                                                            </tr>
        
                                                                                                            <tr>
                                                                                                                <td style="font-size:0px;height:25px;line-height:25px" height="25px">
                                                                                                                    &nbsp;</td>
        
                                                                                                            </tr>
        
                                                                                                        </tbody>
        
                                                                                                    </table>
                                                                                                </td>
        
                                                                                            </tr>
        
                                                                                        </tbody>
        
                                                                                    </table>
                                                                                </th>
                                                                            </tr>
        
                                                                        </tbody>
        
                                                                    </table>
                                                                </td>
        
                                                            </tr>
        
                                                        </tbody>
        
                                                    </table>
                                                </div>
                                            </td>
        
                                        </tr>
        
                                        <tr id="m_-8118325840975667211106a0cdc-0882-dd41-ac07-8a3c1fd8079e">
                                            <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                                <div>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="m_-8118325840975667211email-container" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff" style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th valign="top" class="m_-8118325840975667211stack-column-center m_-8118325840975667211columns" width="100%" style="font-weight:400">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td dir="ltr" valign="top" style="padding:0px">
                                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="m_-8118325840975667211image-ac7ddfc7023e93144958d8a79ab6a731" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td valign="top" style="padding-top:0px;padding-bottom:0px">
                                                                                                                    <table border="0" cellpadding="0" cellspacing="0" align="left" width="" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                                                        <tbody>
                                                                                                                            <tr>
                                                                                                                                <td style="border:0px">
                                                                                                                                    <img align="center" border="0" class="m_-8118325840975667211fluid CToWUd" style="display:block;margin:0px auto;height:auto;font-size:12px;max-width:520px;border:0px!important;outline:none!important;text-decoration:none!important" id="m_-8118325840975667211ac7ddfc7-023e-9314-4958-d8a79ab6a731" src="https://ci4.googleusercontent.com/proxy/Hj5BBrKinnxCuis301886yRNjnHXZc2lfAav4vYXzBMgkMJhdGL1A-e0vhTgMOr0lsDvUDW_4G1tcplojTg6QVKx1VlzPOC_YwyGYLwIyJUEaBot07Nci3ts3fLrx2zVrg=s0-d-e1-ft#https://22.idmkt7.com/recursos/0e7015290bd7b9da35ba01e9ea73c25e/Image/logo.png" alt=" " height="27" width="91">
                                                                                                                                </td>
        
                                                                                                                            </tr>
        
                                                                                                                        </tbody>
        
                                                                                                                    </table>
                                                                                                                </td>
        
                                                                                                            </tr>
        
                                                                                                        </tbody>
        
                                                                                                    </table>
                                                                                                </td>
        
                                                                                            </tr>
        
                                                                                        </tbody>
        
                                                                                    </table>
                                                                                </th>
                                                                            </tr>
        
                                                                        </tbody>
        
                                                                    </table>
                                                                </td>
        
                                                            </tr>
        
                                                        </tbody>
        
                                                    </table>
                                                </div>
                                            </td>
        
                                        </tr>
        
                                        <tr id="m_-8118325840975667211d60bff4f-9944-0958-aae8-1d09026da80f">
                                            <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                                <div>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="m_-8118325840975667211email-container" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff" style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th valign="top" class="m_-8118325840975667211stack-column-center m_-8118325840975667211columns" width="100%" style="font-weight:400">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td dir="ltr" valign="top" style="padding:0px">
                                                                                                    <table align="center" style="border-spacing:0px;table-layout:fixed;margin:0px auto;width:33%;min-width:33%;max-width:33%;border-collapse:separate!important" width="33%">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td style="font-size:0px;height:15px;line-height:15px" height="15px">
                                                                                                                    &nbsp;</td>
        
                                                                                                            </tr>
        
                                                                                                            <tr>
                                                                                                                <td style="border-top:1px solid transparent">
                                                                                                                </td>
        
                                                                                                            </tr>
        
                                                                                                            <tr>
                                                                                                                <td style="font-size:0px;height:15px;line-height:15px" height="15px">
                                                                                                                    &nbsp;</td>
        
                                                                                                            </tr>
        
                                                                                                        </tbody>
        
                                                                                                    </table>
                                                                                                </td>
        
                                                                                            </tr>
        
                                                                                        </tbody>
        
                                                                                    </table>
                                                                                </th>
                                                                            </tr>
        
                                                                        </tbody>
        
                                                                    </table>
                                                                </td>
        
                                                            </tr>
        
                                                        </tbody>
        
                                                    </table>
                                                </div>
                                            </td>
        
                                        </tr>
        
                                        <tr id="m_-81183258409756672118cb1b9c2-3632-58b6-81b1-25a1c4ece35b">
                                            <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                                <div>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="m_-8118325840975667211email-container" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff" style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th valign="top" class="m_-8118325840975667211stack-column-center m_-8118325840975667211columns" width="100%" style="font-weight:400">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td dir="ltr" valign="top" style="padding:0px">
                                                                                                    <table width="100%" id="m_-811832584097566721102b91bf5-6c7c-6c35-43da-0bdf26cc25d9" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td style="font-family:Montserrat,sans-serif;font-size:28px;color:rgb(54,70,86);text-align:left;line-height:150%;padding-top:0px;padding-bottom:0px">
                                                                                                                    <p style="font-family:Montserrat,sans-serif;font-size:28px;color:rgb(54,70,86);line-height:150%;text-align:left;padding-top:0px;padding-bottom:0px;margin:0px">
                                                                                                                        Olá ${name}, perdeu a
                                                                                                                        senha?
                                                                                                                    </p>
                                                                                                                </td>
        
                                                                                                            </tr>
        
                                                                                                        </tbody>
        
                                                                                                    </table>
                                                                                                </td>
        
                                                                                            </tr>
        
                                                                                        </tbody>
        
                                                                                    </table>
                                                                                </th>
                                                                            </tr>
        
                                                                        </tbody>
        
                                                                    </table>
                                                                </td>
        
                                                            </tr>
        
                                                        </tbody>
        
                                                    </table>
                                                </div>
                                            </td>
        
                                        </tr>
        
                                        <tr id="m_-811832584097566721146346d47-1b26-b088-4ac4-7aec5858161c">
                                            <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                                <div>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="m_-8118325840975667211email-container" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff" style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th valign="top" class="m_-8118325840975667211stack-column-center m_-8118325840975667211columns" width="100%" style="font-weight:400">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td dir="ltr" valign="top" style="padding:0px">
                                                                                                    <table align="center" style="border-spacing:0px;table-layout:fixed;margin:0px auto;width:33%;min-width:33%;max-width:33%;border-collapse:separate!important" width="33%">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td style="font-size:0px;height:15px;line-height:15px" height="15px">
                                                                                                                    &nbsp;</td>
        
                                                                                                            </tr>
        
                                                                                                            <tr>
                                                                                                                <td style="border-top:1px solid transparent">
                                                                                                                </td>
        
                                                                                                            </tr>
        
                                                                                                            <tr>
                                                                                                                <td style="font-size:0px;height:15px;line-height:15px" height="15px">
                                                                                                                    &nbsp;</td>
        
                                                                                                            </tr>
        
                                                                                                        </tbody>
        
                                                                                                    </table>
                                                                                                </td>
        
                                                                                            </tr>
        
                                                                                        </tbody>
        
                                                                                    </table>
                                                                                </th>
                                                                            </tr>
        
                                                                        </tbody>
        
                                                                    </table>
                                                                </td>
        
                                                            </tr>
        
                                                        </tbody>
        
                                                    </table>
                                                </div>
                                            </td>
        
                                        </tr>
        
                                        <tr id="m_-811832584097566721123102698-856c-140b-2f0e-db5a23a7cdbf">
                                            <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                                <div>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="m_-8118325840975667211email-container" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff" style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th valign="top" class="m_-8118325840975667211stack-column-center m_-8118325840975667211columns" width="100%" style="font-weight:400">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td dir="ltr" valign="top" style="padding:0px">
                                                                                                    <table width="100%" id="m_-8118325840975667211bceb0c8a-b5a7-dce3-2ef0-04d2e0213b52" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td style="padding-top:0px;padding-bottom:0px" role="textbox" aria-label="Rich Text Editor, main">
                                                                                                                    <p style="font-family:Montserrat,sans-serif;font-size:14px;color:rgb(54,70,86);line-height:150%;text-align:left;padding-top:0px;padding-bottom:0px;word-break:break-word;margin:0px;overflow:hidden">
                                                                                                                        Fique tranquilo!
                                                                                                                        <br> 
                                                                                                                        Clique
                                                                                                                        no link
                                                                                                                        abaixo,
                                                                                                                        para
                                                                                                                        cadastrar
                                                                                                                        uma nova
                                                                                                                        senha.
                                                                                                                    </p>
                                                                                                                </td>
        
                                                                                                            </tr>
        
                                                                                                        </tbody>
        
                                                                                                    </table>
                                                                                                </td>
        
                                                                                            </tr>
        
                                                                                        </tbody>
        
                                                                                    </table>
                                                                                </th>
                                                                            </tr>
        
                                                                        </tbody>
        
                                                                    </table>
                                                                </td>
        
                                                            </tr>
        
                                                        </tbody>
        
                                                    </table>
                                                </div>
                                            </td>
        
                                        </tr>
        
                                        <tr id="m_-8118325840975667211f99f42f0-ec20-404a-b7b3-b8f2e41be596">
                                            <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                                <div>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="m_-8118325840975667211email-container" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff" style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th valign="top" class="m_-8118325840975667211stack-column-center m_-8118325840975667211columns" width="100%" style="font-weight:400">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td dir="ltr" valign="top" style="padding:0px">
                                                                                                    <table align="center" style="border-spacing:0px;table-layout:fixed;margin:0px auto;width:33%;min-width:33%;max-width:33%;border-collapse:separate!important" width="33%">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td style="font-size:0px;height:15px;line-height:15px" height="15px">
                                                                                                                    &nbsp;</td>
        
                                                                                                            </tr>
        
                                                                                                            <tr>
                                                                                                                <td style="border-top:1px solid transparent">
                                                                                                                </td>
        
                                                                                                            </tr>
        
                                                                                                            <tr>
                                                                                                                <td style="font-size:0px;height:15px;line-height:15px" height="15px">
                                                                                                                    &nbsp;</td>
        
                                                                                                            </tr>
        
                                                                                                        </tbody>
        
                                                                                                    </table>
                                                                                                </td>
        
                                                                                            </tr>
        
                                                                                        </tbody>
        
                                                                                    </table>
                                                                                </th>
                                                                            </tr>
        
                                                                        </tbody>
        
                                                                    </table>
                                                                </td>
        
                                                            </tr>
        
                                                        </tbody>
        
                                                    </table>
                                                </div>
                                            </td>
        
                                        </tr>
        
                                        <tr id="m_-811832584097566721147648e2a-431b-06fc-1d69-037e84c8ac0b">
                                            <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                                <div>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="m_-8118325840975667211email-container" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff" style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th valign="top" class="m_-8118325840975667211stack-column-center m_-8118325840975667211columns" width="100%" style="font-weight:400">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td dir="ltr" valign="top" style="padding:0px">
                                                                                                    <table width="100%" id="m_-81183258409756672112b8754a4-1928-c859-ce57-5d466fe8c371" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td style="padding-top:0px;padding-bottom:0px">
                                                                                                                    <p style="font-family:Montserrat,sans-serif;font-size:15px;color:rgb(54,70,86);line-height:150%;text-align:left;padding-top:0px;padding-bottom:0px;word-break:break-word;margin:0px;overflow:hidden">
                                                                                                                        &nbsp;
                                                                                                                    </p>
                                                                                                                </td>
        
                                                                                                            </tr>
        
                                                                                                        </tbody>
        
                                                                                                    </table>
                                                                                                </td>
        
                                                                                            </tr>
        
                                                                                        </tbody>
        
                                                                                    </table>
                                                                                </th>
                                                                            </tr>
        
                                                                        </tbody>
        
                                                                    </table>
                                                                </td>
        
                                                            </tr>
        
                                                        </tbody>
        
                                                    </table>
                                                </div>
                                            </td>
        
                                        </tr>
        
                                        <tr id="m_-81183258409756672113fc6b615-3570-b811-6d62-8ed293329627">
                                            <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                                <div>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="m_-8118325840975667211email-container" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff" style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th valign="top" class="m_-8118325840975667211stack-column-center m_-8118325840975667211columns" width="100%" style="font-weight:400">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td dir="ltr" valign="top" style="padding:0px">
                                                                                                    <table cellspacing="0" cellpadding="0" border="0" class="m_-8118325840975667211button" style="table-layout:fixed;margin:0px auto;width:auto;border-collapse:separate;border-spacing:0px;padding-top:0px;padding-bottom:0px" align="center" id="m_-811832584097566721157dc82d9-c977-c231-2081-5240dcf54fa7">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="center">
                                                                                                                    <a href="http://localhost:3000/admin/password-reset?token=${token}"
                                                                                                                    target="_blank"style="text-decoration:none;">
                                                                                                                        <p style="border-radius:3px;border:none;text-align:center;font-family:Montserrat,sans-serif;font-size:20px;color:rgb(255,255,255);margin:0px;word-break:break-word;background-color:#6558C3;padding:12px 24px;display:block;text-decoration:none">
                                                                                                                            Cadastrar
                                                                                                                            nova
                                                                                                                            senha
                                                                                                                        </p>
                                                                                                                    </a>
                                                                                                                </td>
        
                                                                                                            </tr>
        
                                                                                                        </tbody>
        
                                                                                                    </table>
                                                                                                </td>
        
                                                                                            </tr>
        
                                                                                        </tbody>
        
                                                                                    </table>
                                                                                </th>
                                                                            </tr>
        
                                                                        </tbody>
        
                                                                    </table>
                                                                </td>
        
                                                            </tr>
        
                                                        </tbody>
        
                                                    </table>
                                                </div>
                                            </td>
        
                                        </tr>
        
                                        <tr id="m_-8118325840975667211daa586f7-eec4-5721-2a93-3b5199595917">
                                            <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                                <div>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="m_-8118325840975667211email-container" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff" style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th valign="top" class="m_-8118325840975667211stack-column-center m_-8118325840975667211columns" width="100%" style="font-weight:400">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td dir="ltr" valign="top" style="padding:0px">
                                                                                                    <table align="center" style="border-spacing:0px;table-layout:fixed;margin:0px auto;width:33%;min-width:33%;max-width:33%;border-collapse:separate!important" width="33%">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td style="font-size:0px;height:25px;line-height:25px" height="25px">
                                                                                                                    &nbsp;</td>
        
                                                                                                            </tr>
        
                                                                                                            <tr>
                                                                                                                <td style="border-top:1px solid transparent">
                                                                                                                </td>
        
                                                                                                            </tr>
        
                                                                                                            <tr>
                                                                                                                <td style="font-size:0px;height:25px;line-height:25px" height="25px">
                                                                                                                    &nbsp;</td>
        
                                                                                                            </tr>
        
                                                                                                        </tbody>
        
                                                                                                    </table>
                                                                                                </td>
        
                                                                                            </tr>
        
                                                                                        </tbody>
        
                                                                                    </table>
                                                                                </th>
                                                                            </tr>
        
                                                                        </tbody>
        
                                                                    </table>
                                                                </td>
        
                                                            </tr>
        
                                                        </tbody>
        
                                                    </table>
                                                </div>
                                            </td>
        
                                        </tr>
        
                                        <tr id="m_-8118325840975667211ad3ed539-bbfa-9139-c43d-7c0f03e8aee0">
                                            <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                                <div>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="m_-8118325840975667211email-container" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff" style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th valign="top" class="m_-8118325840975667211stack-column-center m_-8118325840975667211columns" width="100%" style="font-weight:400">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td dir="ltr" valign="top" style="padding:0px">
                                                                                                    <table width="100%" id="m_-81183258409756672115b690472-ed82-1cc1-b08d-c755b4ae589a" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td style="padding-top:0px;padding-bottom:0px">
                                                                                                                    <p style="font-family:Montserrat,sans-serif;font-size:15px;color:rgb(54,70,86);line-height:150%;text-align:left;padding-top:0px;padding-bottom:0px;word-break:break-word;margin:0px;overflow:hidden">
                                                                                                                        &nbsp;
                                                                                                                    </p>
                                                                                                                </td>
        
                                                                                                            </tr>
        
                                                                                                        </tbody>
        
                                                                                                    </table>
                                                                                                </td>
        
                                                                                            </tr>
        
                                                                                        </tbody>
        
                                                                                    </table>
                                                                                </th>
                                                                            </tr>
        
                                                                        </tbody>
        
                                                                    </table>
                                                                </td>
        
                                                            </tr>
        
                                                        </tbody>
        
                                                    </table>
                                                </div>
                                            </td>
        
                                        </tr>
        
                                        
        
                                        <tr id="m_-8118325840975667211d57d0b93-350f-65fd-7466-c8ae68c617ba">
                                            <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                                <div>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="m_-8118325840975667211email-container" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top" width="100%" dir="ltr" bgcolor="transparent" style="background-color:transparent;padding:0px 40px">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th valign="top" class="m_-8118325840975667211stack-column-center m_-8118325840975667211columns" width="100%" style="font-weight:400">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td dir="ltr" valign="top" style="padding:0px">
                                                                                                    <table align="center" style="border-spacing:0px;table-layout:fixed;margin:0px auto;width:33%;min-width:33%;max-width:33%;border-collapse:separate!important" width="33%">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td style="font-size:0px;height:15px;line-height:15px" height="15px">
                                                                                                                    &nbsp;</td>
        
                                                                                                            </tr>
        
                                                                                                            <tr>
                                                                                                                <td style="border-top:1px solid transparent">
                                                                                                                </td>
        
                                                                                                            </tr>
        
                                                                                                            <tr>
                                                                                                                <td style="font-size:0px;height:15px;line-height:15px" height="15px">
                                                                                                                    &nbsp;</td>
        
                                                                                                            </tr>
        
                                                                                                        </tbody>
        
                                                                                                    </table>
                                                                                                </td>
        
                                                                                            </tr>
        
                                                                                        </tbody>
        
                                                                                    </table>
                                                                                </th>
                                                                            </tr>
        
                                                                        </tbody>
        
                                                                    </table>
                                                                </td>
        
                                                            </tr>
        
                                                        </tbody>
        
                                                    </table>
                                                </div>
                                            </td>
        
                                        </tr>
        
                                        
        
                                        
        
                                    </tbody>
        
                                </table>
                                <div class="yj6qo"></div>
                                <div class="adL">
                                </div>
                            </div>
                            <div class="adL">
                            </div>
                        </div>
                        <div class="adL">
                        </div>
                        <div style="clear:both!important;height:0!important" class="adL"></div>
                    </div>
                    <div class="adL">
        
                    </div>
                </div>
            </div>
            <div id=":2r" class="ii gt" style="display:none">
                <div id=":2q" class="a3s aiL "></div>
            </div>
            <div class="hi"></div>
        </div>
        `;
    },
    sendAccessEmail(token, name, senha) {
        return `
        <div class="">
        <div class="aHl"></div>
        <div id=":mp" tabindex="-1"></div>
        <div id=":li" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0.">
            <div id=":lj" class="a3s aiL msg-4105437905510428836"><u></u>
    
    
    
    
    
    
                <div width="100%" style="padding:0px;height:100%;width:100%;margin:0px">
                    <div
                        style="display:none;font-size:0;line-height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;color:#ffffff">
    
    
    
    
    
    
    
                        Bem vindo, Nome aqui =)
    
    
    
                        Obrigado!
                        Estamos muito felizes por tê-lo conosco.
    
    
    
                        Esta é sua senha de acesso gerada automaticamente, para muda-la basta clicar em &amp;#38</div>
                    <div style="background:#ffffff">
                        <div style="width:1px;height:1px"></div>
                    </div> <img
                        src="https://ci5.googleusercontent.com/proxy/RHKlt90_P1cX0XixmcnV088jzIKK1Nq0NZbpy80Hvcl81d9b9mGupHkxL3n40bT4GodVOcu7WuN-DP3N3qgO2GpI0KYwtlqz8YdlrvzEGxmhsxs2hPTvDnbBqNCiyvEtDRu6p-pI6BXov4YH9B3mdZiG-F0iCUWRcZRl8zdaF1-aDWalQIzmnXnBVcUvnYyVuL8fp7hRveh92oLdJg=s0-d-e1-ft#https://22.idmkt7.com/stats.php?l=ef9685205d3aaed9cadab41ec3c571ba&amp;u=d5a6d4bafa&amp;ca_id=1&amp;cl_id=1359433&amp;l_id=1&amp;m_id=9467526&amp;hf=2256&amp;g=1&amp;i=1"
                        style="width:3px!important;height:2px!important;overflow:hidden;border:0px solid transparent;margin:0;line-height:2px"
                        width="3" height="2" align="middle" border="0" alt="" class="CToWUd"
                        jslog="138226; u014N:xr6bB; 53:W2ZhbHNlXQ..">
                    <div>
                        <div>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto;background-color:rgb(242,242,242);background-position:center center;background-repeat:no-repeat;background-size:cover">
                                <tbody>
                                    <tr id="m_-4105437905510428836601c7379-96b5-9dc5-3a0e-21e840f58a91">
                                        <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                            <div>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600"
                                                    class="m_-4105437905510428836email-container"
                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto"
                                                    align="center">
                                                    <tbody>
    
                                                        <tr>
                                                            <td valign="top" width="100%" dir="ltr" bgcolor="transparent"
                                                                style="background-color:transparent;padding:0px 40px">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    width="100%"
                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                    <tbody>
    
                                                                        <tr>
                                                                            <th valign="top"
                                                                                class="m_-4105437905510428836stack-column-center m_-4105437905510428836columns"
                                                                                width="100%" style="font-weight:400">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%"
                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                    <tbody>
    
                                                                                        <tr>
                                                                                            <td dir="ltr" valign="top"
                                                                                                style="padding:0px">
                                                                                                <table align="center"
                                                                                                    style="border-spacing:0px;table-layout:fixed;margin:0px auto;width:33%;min-width:33%;max-width:33%;border-collapse:separate!important"
                                                                                                    width="33%">
                                                                                                    <tbody>
    
                                                                                                        <tr>
                                                                                                            <td style="font-size:0px;height:25px;line-height:25px"
                                                                                                                height="25px">
                                                                                                                &nbsp;</td>
    
                                                                                                        </tr>
    
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="border-top:1px solid transparent">
                                                                                                            </td>
    
                                                                                                        </tr>
    
                                                                                                        <tr>
                                                                                                            <td style="font-size:0px;height:25px;line-height:25px"
                                                                                                                height="25px">
                                                                                                                &nbsp;</td>
    
                                                                                                        </tr>
    
                                                                                                    </tbody>
    
                                                                                                </table>
                                                                                            </td>
    
                                                                                        </tr>
    
                                                                                    </tbody>
    
                                                                                </table>
                                                                            </th>
                                                                        </tr>
    
                                                                    </tbody>
    
                                                                </table>
                                                            </td>
    
                                                        </tr>
    
                                                    </tbody>
    
                                                </table>
                                            </div>
                                        </td>
    
                                    </tr>
    
                                    <tr id="m_-4105437905510428836b6d1142a-651c-754d-8580-1716c54eb756">
                                        <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                            <div>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600"
                                                    class="m_-4105437905510428836email-container"
                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto"
                                                    align="center">
                                                    <tbody>
    
                                                        <tr>
                                                            <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff"
                                                                style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    width="100%"
                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                    <tbody>
    
                                                                        <tr>
                                                                            <th valign="top"
                                                                                class="m_-4105437905510428836stack-column-center m_-4105437905510428836columns"
                                                                                width="100%" style="font-weight:400">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%"
                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                    <tbody>
    
                                                                                        <tr>
                                                                                            <td dir="ltr" valign="top"
                                                                                                style="padding:0px">
                                                                                                <table align="center"
                                                                                                    style="border-spacing:0px;table-layout:fixed;margin:0px auto;width:33%;min-width:33%;max-width:33%;border-collapse:separate!important"
                                                                                                    width="33%">
                                                                                                    <tbody>
    
                                                                                                        <tr>
                                                                                                            <td style="font-size:0px;height:25px;line-height:25px"
                                                                                                                height="25px">
                                                                                                                &nbsp;</td>
    
                                                                                                        </tr>
    
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="border-top:1px solid transparent">
                                                                                                            </td>
    
                                                                                                        </tr>
    
                                                                                                        <tr>
                                                                                                            <td style="font-size:0px;height:25px;line-height:25px"
                                                                                                                height="25px">
                                                                                                                &nbsp;</td>
    
                                                                                                        </tr>
    
                                                                                                    </tbody>
    
                                                                                                </table>
                                                                                            </td>
    
                                                                                        </tr>
    
                                                                                    </tbody>
    
                                                                                </table>
                                                                            </th>
                                                                        </tr>
    
                                                                    </tbody>
    
                                                                </table>
                                                            </td>
    
                                                        </tr>
    
                                                    </tbody>
    
                                                </table>
                                            </div>
                                        </td>
    
                                    </tr>
    
                                    <tr id="m_-410543790551042883673bcae88-17f8-f2a8-a24c-ee15dcb53336">
                                        <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                            <div>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600"
                                                    class="m_-4105437905510428836email-container"
                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto"
                                                    align="center">
                                                    <tbody>
    
                                                        <tr>
                                                            <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff"
                                                                style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    width="100%"
                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                    <tbody>
    
                                                                        <tr>
                                                                            <th valign="top"
                                                                                class="m_-4105437905510428836stack-column-center m_-4105437905510428836columns"
                                                                                width="100%" style="font-weight:400">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%"
                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                    <tbody>
    
                                                                                        <tr>
                                                                                            <td dir="ltr" valign="top"
                                                                                                style="padding:0px">
                                                                                                <table border="0"
                                                                                                    cellpadding="0"
                                                                                                    cellspacing="0"
                                                                                                    width="100%"
                                                                                                    class="m_-4105437905510428836image-6c95efa914c1c65323549be4fd3ff5df"
                                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                                    <tbody>
    
                                                                                                        <tr>
                                                                                                            <td valign="top"
                                                                                                                style="padding-top:0px;padding-bottom:0px">
                                                                                                                <table
                                                                                                                    border="0"
                                                                                                                    cellpadding="0"
                                                                                                                    cellspacing="0"
                                                                                                                    align="left"
                                                                                                                    width=""
                                                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                                                    <tbody>
    
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                style="border:0px">
                                                                                                                                <img align="center"
                                                                                                                                    border="0"
                                                                                                                                    class="m_-4105437905510428836fluid CToWUd"
                                                                                                                                    style="display:block;margin:0px auto;height:auto;font-size:12px;max-width:520px;border:0px!important;outline:none!important;text-decoration:none!important"
                                                                                                                                    id="m_-41054379055104288366c95efa9-14c1-c653-2354-9be4fd3ff5df"
                                                                                                                                    src="https://ci4.googleusercontent.com/proxy/Hj5BBrKinnxCuis301886yRNjnHXZc2lfAav4vYXzBMgkMJhdGL1A-e0vhTgMOr0lsDvUDW_4G1tcplojTg6QVKx1VlzPOC_YwyGYLwIyJUEaBot07Nci3ts3fLrx2zVrg=s0-d-e1-ft#https://22.idmkt7.com/recursos/0e7015290bd7b9da35ba01e9ea73c25e/Image/logo.png"
                                                                                                                                    alt=" "
                                                                                                                                    height="27"
                                                                                                                                    width="91">
                                                                                                                            </td>
    
                                                                                                                        </tr>
    
                                                                                                                    </tbody>
    
                                                                                                                </table>
                                                                                                            </td>
    
                                                                                                        </tr>
    
                                                                                                    </tbody>
    
                                                                                                </table>
                                                                                            </td>
    
                                                                                        </tr>
    
                                                                                    </tbody>
    
                                                                                </table>
                                                                            </th>
                                                                        </tr>
    
                                                                    </tbody>
    
                                                                </table>
                                                            </td>
    
                                                        </tr>
    
                                                    </tbody>
    
                                                </table>
                                            </div>
                                        </td>
    
                                    </tr>
    
                                    <tr id="m_-4105437905510428836d60bff4f-9944-0958-aae8-1d09026da80f">
                                        <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                            <div>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600"
                                                    class="m_-4105437905510428836email-container"
                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto"
                                                    align="center">
                                                    <tbody>
    
                                                        <tr>
                                                            <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff"
                                                                style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    width="100%"
                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                    <tbody>
    
                                                                        <tr>
                                                                            <th valign="top"
                                                                                class="m_-4105437905510428836stack-column-center m_-4105437905510428836columns"
                                                                                width="100%" style="font-weight:400">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%"
                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                    <tbody>
    
                                                                                        <tr>
                                                                                            <td dir="ltr" valign="top"
                                                                                                style="padding:0px">
                                                                                                <table align="center"
                                                                                                    style="border-spacing:0px;table-layout:fixed;margin:0px auto;width:33%;min-width:33%;max-width:33%;border-collapse:separate!important"
                                                                                                    width="33%">
                                                                                                    <tbody>
    
                                                                                                        <tr>
                                                                                                            <td style="font-size:0px;height:15px;line-height:15px"
                                                                                                                height="15px">
                                                                                                                &nbsp;</td>
    
                                                                                                        </tr>
    
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="border-top:1px solid transparent">
                                                                                                            </td>
    
                                                                                                        </tr>
    
                                                                                                        <tr>
                                                                                                            <td style="font-size:0px;height:15px;line-height:15px"
                                                                                                                height="15px">
                                                                                                                &nbsp;</td>
    
                                                                                                        </tr>
    
                                                                                                    </tbody>
    
                                                                                                </table>
                                                                                            </td>
    
                                                                                        </tr>
    
                                                                                    </tbody>
    
                                                                                </table>
                                                                            </th>
                                                                        </tr>
    
                                                                    </tbody>
    
                                                                </table>
                                                            </td>
    
                                                        </tr>
    
                                                    </tbody>
    
                                                </table>
                                            </div>
                                        </td>
    
                                    </tr>
    
                                    <tr id="m_-41054379055104288368cb1b9c2-3632-58b6-81b1-25a1c4ece35b">
                                        <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                            <div>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600"
                                                    class="m_-4105437905510428836email-container"
                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto"
                                                    align="center">
                                                    <tbody>
    
                                                        <tr>
                                                            <td valign="top" width="100%" dir="ltr" bgcolor="#FFFFFF"
                                                                style="background-color:rgb(255,255,255);padding:10px 40px">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    width="100%"
                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                    <tbody>
    
                                                                        <tr>
                                                                            <th valign="top"
                                                                                class="m_-4105437905510428836stack-column-center m_-4105437905510428836columns"
                                                                                width="100%" style="font-weight:400">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%"
                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                    <tbody>
    
                                                                                        <tr>
                                                                                            <td dir="ltr" valign="top"
                                                                                                style="padding:0px">
                                                                                                <table width="100%"
                                                                                                    id="m_-410543790551042883602b91bf5-6c7c-6c35-43da-0bdf26cc25d9"
                                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                                    <tbody>
    
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="font-family:&quot;Courier New&quot;;font-size:28px;color:rgb(54,70,86);text-align:left;line-height:150%;padding-top:0px;padding-bottom:0px">
                                                                                                                <p
                                                                                                                    style="font-family:&quot;Courier New&quot;;font-size:28px;color:rgb(54,70,86);line-height:150%;text-align:left;padding-top:0px;padding-bottom:0px;margin:0px">
                                                                                                                    Bem
                                                                                                                    vindo,
                                                                                                                    ${name}
                                                                                                                    =)</p>
                                                                                                            </td>
    
                                                                                                        </tr>
    
                                                                                                    </tbody>
    
                                                                                                </table>
                                                                                            </td>
    
                                                                                        </tr>
    
                                                                                    </tbody>
    
                                                                                </table>
                                                                            </th>
                                                                        </tr>
    
                                                                    </tbody>
    
                                                                </table>
                                                            </td>
    
                                                        </tr>
    
                                                    </tbody>
    
                                                </table>
                                            </div>
                                        </td>
    
                                    </tr>
    
                                    <tr id="m_-410543790551042883646346d47-1b26-b088-4ac4-7aec5858161c">
                                        <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                            <div>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600"
                                                    class="m_-4105437905510428836email-container"
                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto"
                                                    align="center">
                                                    <tbody>
    
                                                        <tr>
                                                            <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff"
                                                                style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    width="100%"
                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                    <tbody>
    
                                                                        <tr>
                                                                            <th valign="top"
                                                                                class="m_-4105437905510428836stack-column-center m_-4105437905510428836columns"
                                                                                width="100%" style="font-weight:400">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%"
                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                    <tbody>
    
                                                                                        <tr>
                                                                                            <td dir="ltr" valign="top"
                                                                                                style="padding:0px">
                                                                                                <table align="center"
                                                                                                    style="border-spacing:0px;table-layout:fixed;margin:0px auto;width:33%;min-width:33%;max-width:33%;border-collapse:separate!important"
                                                                                                    width="33%">
                                                                                                    <tbody>
    
                                                                                                        <tr>
                                                                                                            <td style="font-size:0px;height:15px;line-height:15px"
                                                                                                                height="15px">
                                                                                                                &nbsp;</td>
    
                                                                                                        </tr>
    
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="border-top:1px solid transparent">
                                                                                                            </td>
    
                                                                                                        </tr>
    
                                                                                                        <tr>
                                                                                                            <td style="font-size:0px;height:15px;line-height:15px"
                                                                                                                height="15px">
                                                                                                                &nbsp;</td>
    
                                                                                                        </tr>
    
                                                                                                    </tbody>
    
                                                                                                </table>
                                                                                            </td>
    
                                                                                        </tr>
    
                                                                                    </tbody>
    
                                                                                </table>
                                                                            </th>
                                                                        </tr>
    
                                                                    </tbody>
    
                                                                </table>
                                                            </td>
    
                                                        </tr>
    
                                                    </tbody>
    
                                                </table>
                                            </div>
                                        </td>
    
                                    </tr>
    
                                    <tr id="m_-41054379055104288368b562d36-29a0-8037-1bae-75284b99369e">
                                        <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                            <div>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600"
                                                    class="m_-4105437905510428836email-container"
                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto"
                                                    align="center">
                                                    <tbody>
    
                                                        <tr>
                                                            <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff"
                                                                style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    width="100%"
                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                    <tbody>
    
                                                                        <tr>
                                                                            <th valign="top"
                                                                                class="m_-4105437905510428836stack-column-center m_-4105437905510428836columns"
                                                                                width="100%" style="font-weight:400">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%"
                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                    <tbody>
    
                                                                                        <tr>
                                                                                            <td dir="ltr" valign="top"
                                                                                                style="padding:0px">
                                                                                                <table width="100%"
                                                                                                    id="m_-4105437905510428836a0fcd0f6-a948-0c64-bce6-042009d355c0"
                                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                                    <tbody>
    
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="padding-top:0px;padding-bottom:0px">
                                                                                                                <p
                                                                                                                    style="font-family:Montserrat,sans-serif;font-size:14px;color:rgb(54,70,86);line-height:150%;text-align:left;padding-top:0px;padding-bottom:0px;word-break:break-word;margin:0px;overflow:hidden">
                                                                                                                    Estamos
                                                                                                                    muito
                                                                                                                    felizes
                                                                                                                    por
                                                                                                                    tê-lo
                                                                                                                    conosco.
                                                                                                                </p>
                                                                                                            </td>
    
                                                                                                        </tr>
    
                                                                                                    </tbody>
    
                                                                                                </table>
                                                                                            </td>
    
                                                                                        </tr>
    
                                                                                    </tbody>
    
                                                                                </table>
                                                                            </th>
                                                                        </tr>
    
                                                                    </tbody>
    
                                                                </table>
                                                            </td>
    
                                                        </tr>
    
                                                    </tbody>
    
                                                </table>
                                            </div>
                                        </td>
    
                                    </tr>
    
                                    <tr id="m_-41054379055104288361a2c0ec7-8223-6c08-025f-06968368632a">
                                        <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                            <div>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600"
                                                    class="m_-4105437905510428836email-container"
                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto"
                                                    align="center">
                                                    <tbody>
    
                                                        <tr>
                                                            <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff"
                                                                style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    width="100%"
                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                    <tbody>
    
                                                                        <tr>
                                                                            <th valign="top"
                                                                                class="m_-4105437905510428836stack-column-center m_-4105437905510428836columns"
                                                                                width="100%" style="font-weight:400">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%"
                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                    <tbody>
    
                                                                                        <tr>
                                                                                            <td dir="ltr" valign="top"
                                                                                                style="padding:0px">
                                                                                                <table align="center"
                                                                                                    style="border-spacing:0px;table-layout:fixed;margin:0px auto;width:33%;min-width:33%;max-width:33%;border-collapse:separate!important"
                                                                                                    width="33%">
                                                                                                    <tbody>
    
                                                                                                        <tr>
                                                                                                            <td style="font-size:0px;height:5px;line-height:5px"
                                                                                                                height="5px">
                                                                                                                &nbsp;</td>
    
                                                                                                        </tr>
    
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="border-top:1px solid transparent">
                                                                                                            </td>
    
                                                                                                        </tr>
    
                                                                                                        <tr>
                                                                                                            <td style="font-size:0px;height:5px;line-height:5px"
                                                                                                                height="5px">
                                                                                                                &nbsp;</td>
    
                                                                                                        </tr>
    
                                                                                                    </tbody>
    
                                                                                                </table>
                                                                                            </td>
    
                                                                                        </tr>
    
                                                                                    </tbody>
    
                                                                                </table>
                                                                            </th>
                                                                        </tr>
    
                                                                    </tbody>
    
                                                                </table>
                                                            </td>
    
                                                        </tr>
    
                                                    </tbody>
    
                                                </table>
                                            </div>
                                        </td>
    
                                    </tr>
    
                                    <tr id="m_-410543790551042883623102698-856c-140b-2f0e-db5a23a7cdbf">
                                        <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                            <div>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600"
                                                    class="m_-4105437905510428836email-container"
                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto"
                                                    align="center">
                                                    <tbody>
    
                                                        <tr>
                                                            <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff"
                                                                style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    width="100%"
                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                    <tbody>
    
                                                                        <tr>
                                                                            <th valign="top"
                                                                                class="m_-4105437905510428836stack-column-center m_-4105437905510428836columns"
                                                                                width="100%" style="font-weight:400">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%"
                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                    <tbody>
    
                                                                                        <tr>
                                                                                            <td dir="ltr" valign="top"
                                                                                                style="padding:0px">
                                                                                                <table width="100%"
                                                                                                    id="m_-4105437905510428836bceb0c8a-b5a7-dce3-2ef0-04d2e0213b52"
                                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                                    <tbody>
    
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="padding-top:0px;padding-bottom:0px">
                                                                                                                <p
                                                                                                                    style="font-family:Montserrat,sans-serif;font-size:14px;color:rgb(54,70,86);line-height:150%;text-align:left;padding-top:0px;padding-bottom:0px;word-break:break-word;margin:0px;overflow:hidden">
                                                                                                                    Esta é
                                                                                                                    sua
                                                                                                                    senha de
                                                                                                                    acesso
                                                                                                                    gerada
                                                                                                                    automaticamente,
                                                                                                                    para
                                                                                                                    muda-la
                                                                                                                    basta
                                                                                                                    clicar
                                                                                                                    em
                                                                                                                    "Perdeu
                                                                                                                    a
                                                                                                                    senha"
                                                                                                                    na
                                                                                                                    página
                                                                                                                    de
                                                                                                                    login.
                                                                                                                </p>
                                                                                                                <p
                                                                                                                    style="font-family:Montserrat,sans-serif;font-size:14px;color:rgb(54,70,86);line-height:150%;text-align:left;padding-top:0px;padding-bottom:0px;word-break:break-word;margin:0px;overflow:hidden">
                                                                                                                    &nbsp;
                                                                                                                </p>
                                                                                                                <p
                                                                                                                    style="font-family:Montserrat,sans-serif;font-size:14px;color:rgb(54,70,86);line-height:150%;text-align:left;padding-top:0px;padding-bottom:0px;word-break:break-word;margin:0px;overflow:hidden">
                                                                                                                    Sua
                                                                                                                    senha de
                                                                                                                    acesso
                                                                                                                    é:</p>
                                                                                                                <p
                                                                                                                    style="font-family:Montserrat,sans-serif;font-size:14px;color:rgb(54,70,86);line-height:150%;text-align:left;padding-top:0px;padding-bottom:0px;word-break:break-word;margin:0px;overflow:hidden">
                                                                                                                    &nbsp;
                                                                                                                </p>
                                                                                                            </td>
    
                                                                                                        </tr>
    
                                                                                                    </tbody>
    
                                                                                                </table>
                                                                                            </td>
    
                                                                                        </tr>
    
                                                                                    </tbody>
    
                                                                                </table>
                                                                            </th>
                                                                        </tr>
    
                                                                    </tbody>
    
                                                                </table>
                                                            </td>
    
                                                        </tr>
    
                                                    </tbody>
    
                                                </table>
                                            </div>
                                        </td>
    
                                    </tr>
    
                                    <tr id="m_-41054379055104288367f4a0955-6080-d377-e719-1eab92b5cef6">
                                        <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                            <div>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600"
                                                    class="m_-4105437905510428836email-container"
                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto"
                                                    align="center">
                                                    <tbody>
    
                                                        <tr>
                                                            <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff"
                                                                style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    width="100%"
                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                    <tbody>
    
                                                                        <tr>
                                                                            <th valign="top"
                                                                                class="m_-4105437905510428836stack-column-center m_-4105437905510428836columns"
                                                                                width="100%" style="font-weight:400">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%"
                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                    <tbody>
    
                                                                                        <tr>
                                                                                            <td dir="ltr" valign="top"
                                                                                                style="padding:0px">
                                                                                                <table width="100%"
                                                                                                    id="m_-4105437905510428836de5c3319-f880-fa80-000b-bea2e0f7c60e"
                                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                                    <tbody>
    
                                                                                                        <tr>
                                                                                                            <td style="padding-top:0px;padding-bottom:0px"
                                                                                                                role="textbox"
                                                                                                                aria-label="Rich Text Editor, main">
                                                                                                                <p
                                                                                                                    style="font-family:Montserrat,sans-serif;font-size:23px;color:rgb(54,70,86);line-height:150%;text-align:left;padding-top:0px;padding-bottom:0px;word-break:break-word;margin:0px;overflow:hidden">
                                                                                                                    <strong>${senha}</strong>
                                                                                                                </p>
                                                                                                            </td>
    
                                                                                                        </tr>
    
                                                                                                    </tbody>
    
                                                                                                </table>
                                                                                            </td>
    
                                                                                        </tr>
    
                                                                                    </tbody>
    
                                                                                </table>
                                                                            </th>
                                                                        </tr>
    
                                                                    </tbody>
    
                                                                </table>
                                                            </td>
    
                                                        </tr>
    
                                                    </tbody>
    
                                                </table>
                                            </div>
                                        </td>
    
                                    </tr>
    
                                    <tr id="m_-4105437905510428836f99f42f0-ec20-404a-b7b3-b8f2e41be596">
                                        <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                            <div>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600"
                                                    class="m_-4105437905510428836email-container"
                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto"
                                                    align="center">
                                                    <tbody>
    
                                                        <tr>
                                                            <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff"
                                                                style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    width="100%"
                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                    <tbody>
    
                                                                        <tr>
                                                                            <th valign="top"
                                                                                class="m_-4105437905510428836stack-column-center m_-4105437905510428836columns"
                                                                                width="100%" style="font-weight:400">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%"
                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                    <tbody>
    
                                                                                        <tr>
                                                                                            <td dir="ltr" valign="top"
                                                                                                style="padding:0px">
                                                                                                <table align="center"
                                                                                                    style="border-spacing:0px;table-layout:fixed;margin:0px auto;width:33%;min-width:33%;max-width:33%;border-collapse:separate!important"
                                                                                                    width="33%">
                                                                                                    <tbody>
    
                                                                                                        <tr>
                                                                                                            <td style="font-size:0px;height:15px;line-height:15px"
                                                                                                                height="15px">
                                                                                                                &nbsp;</td>
    
                                                                                                        </tr>
    
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="border-top:1px solid transparent">
                                                                                                            </td>
    
                                                                                                        </tr>
    
                                                                                                        <tr>
                                                                                                            <td style="font-size:0px;height:15px;line-height:15px"
                                                                                                                height="15px">
                                                                                                                &nbsp;</td>
    
                                                                                                        </tr>
    
                                                                                                    </tbody>
    
                                                                                                </table>
                                                                                            </td>
    
                                                                                        </tr>
    
                                                                                    </tbody>
    
                                                                                </table>
                                                                            </th>
                                                                        </tr>
    
                                                                    </tbody>
    
                                                                </table>
                                                            </td>
    
                                                        </tr>
    
                                                    </tbody>
    
                                                </table>
                                            </div>
                                        </td>
    
                                    </tr>
    
                                    <tr id="m_-41054379055104288363b857c1a-9488-d749-7627-5bd2850daa93">
                                        <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                            <div>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600"
                                                    class="m_-4105437905510428836email-container"
                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto"
                                                    align="center">
                                                    <tbody>
    
                                                        <tr>
                                                            <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff"
                                                                style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    width="100%"
                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                    <tbody>
    
                                                                        <tr>
                                                                            <th valign="top"
                                                                                class="m_-4105437905510428836stack-column-center m_-4105437905510428836columns"
                                                                                width="100%" style="font-weight:400">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%"
                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                    <tbody>
    
                                                                                        <tr>
                                                                                            <td dir="ltr" valign="top"
                                                                                                style="padding:0px">
                                                                                                <table width="100%"
                                                                                                    id="m_-410543790551042883633684197-770a-08a1-17d2-7f224725f573"
                                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                                    <tbody>
    
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="padding-top:0px;padding-bottom:0px">
                                                                                                                <p
                                                                                                                    style="font-family:Montserrat,sans-serif;font-size:10px;color:rgb(54,70,86);line-height:150%;text-align:left;padding-top:0px;padding-bottom:0px;word-break:break-word;margin:0px;overflow:hidden">
                                                                                                                    &nbsp;
                                                                                                                </p>
                                                                                                            </td>
    
                                                                                                        </tr>
    
                                                                                                    </tbody>
    
                                                                                                </table>
                                                                                            </td>
    
                                                                                        </tr>
    
                                                                                    </tbody>
    
                                                                                </table>
                                                                            </th>
                                                                        </tr>
    
                                                                    </tbody>
    
                                                                </table>
                                                            </td>
    
                                                        </tr>
    
                                                    </tbody>
    
                                                </table>
                                            </div>
                                        </td>
    
                                    </tr>
    
                                    <tr id="m_-41054379055104288361d88d604-f1f8-25cd-806b-5a90f8b0f7c0">
                                        <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                            <div>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600"
                                                    class="m_-4105437905510428836email-container"
                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto"
                                                    align="center">
                                                    <tbody>
    
                                                        <tr>
                                                            <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff"
                                                                style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    width="100%"
                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                    <tbody>
    
                                                                        <tr>
                                                                            <th valign="top"
                                                                                class="m_-4105437905510428836stack-column-center m_-4105437905510428836columns"
                                                                                width="100%" style="font-weight:400">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%"
                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                    <tbody>
    
                                                                                        <tr>
                                                                                            <td dir="ltr" valign="top"
                                                                                                style="padding:0px">
                                                                                                <table cellspacing="0"
                                                                                                    cellpadding="0"
                                                                                                    border="0"
                                                                                                    class="m_-4105437905510428836button"
                                                                                                    style="table-layout:fixed;margin:0px auto;width:auto;border-collapse:separate;border-spacing:0px;padding-top:0px;padding-bottom:0px"
                                                                                                    align="center"
                                                                                                    id="m_-4105437905510428836fecab8ca-584a-0cf2-0e9d-26226340d44f">
                                                                                                    <tbody>
    
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                align="center">
                                                                                                                <a href="http://localhost:3000/admin/password-reset?token=${token}"
                                                                                                                    target="_blank"
                                                                                                                    style="text-decoration:none;">
                                                                                                                    <p
                                                                                                                        style="border-radius:3px;border:none;text-align:center;font-family:Montserrat,sans-serif;font-size:20px;color:rgb(255,255,255);margin:0px;word-break:break-word;background-color:#6558C3;padding:12px 24px;display:block;text-decoration:none;cursor:pointer">
                                                                                                                        Fazer
                                                                                                                        Login
                                                                                                                    </p>
                                                                                                                </a>
                                                                                                            </td>
    
                                                                                                        </tr>
    
                                                                                                    </tbody>
    
                                                                                                </table>
                                                                                            </td>
    
                                                                                        </tr>
    
                                                                                    </tbody>
    
                                                                                </table>
                                                                            </th>
                                                                        </tr>
    
                                                                    </tbody>
    
                                                                </table>
                                                            </td>
    
                                                        </tr>
    
                                                    </tbody>
    
                                                </table>
                                            </div>
                                        </td>
    
                                    </tr>
    
                                    <tr id="m_-4105437905510428836daa586f7-eec4-5721-2a93-3b5199595917">
                                        <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                            <div>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600"
                                                    class="m_-4105437905510428836email-container"
                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto"
                                                    align="center">
                                                    <tbody>
    
                                                        <tr>
                                                            <td valign="top" width="100%" dir="ltr" bgcolor="#ffffff"
                                                                style="background-color:rgb(255,255,255);padding:0px 40px">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    width="100%"
                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                    <tbody>
    
                                                                        <tr>
                                                                            <th valign="top"
                                                                                class="m_-4105437905510428836stack-column-center m_-4105437905510428836columns"
                                                                                width="100%" style="font-weight:400">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%"
                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                    <tbody>
    
                                                                                        <tr>
                                                                                            <td dir="ltr" valign="top"
                                                                                                style="padding:0px">
                                                                                                <table align="center"
                                                                                                    style="border-spacing:0px;table-layout:fixed;margin:0px auto;width:33%;min-width:33%;max-width:33%;border-collapse:separate!important"
                                                                                                    width="33%">
                                                                                                    <tbody>
    
                                                                                                        <tr>
                                                                                                            <td style="font-size:0px;height:25px;line-height:25px"
                                                                                                                height="25px">
                                                                                                                &nbsp;</td>
    
                                                                                                        </tr>
    
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="border-top:1px solid transparent">
                                                                                                            </td>
    
                                                                                                        </tr>
    
                                                                                                        <tr>
                                                                                                            <td style="font-size:0px;height:25px;line-height:25px"
                                                                                                                height="25px">
                                                                                                                &nbsp;</td>
    
                                                                                                        </tr>
    
                                                                                                    </tbody>
    
                                                                                                </table>
                                                                                            </td>
    
                                                                                        </tr>
    
                                                                                    </tbody>
    
                                                                                </table>
                                                                            </th>
                                                                        </tr>
    
                                                                    </tbody>
    
                                                                </table>
                                                            </td>
    
                                                        </tr>
    
                                                    </tbody>
    
                                                </table>
                                            </div>
                                        </td>
    
                                    </tr>
    
    
    
                                    <tr id="m_-4105437905510428836d57d0b93-350f-65fd-7466-c8ae68c617ba">
                                        <td valign="top" style="font-size:0px;background-color:transparent" align="center">
                                            <div>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600"
                                                    class="m_-4105437905510428836email-container"
                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:auto"
                                                    align="center">
                                                    <tbody>
    
                                                        <tr>
                                                            <td valign="top" width="100%" dir="ltr" bgcolor="transparent"
                                                                style="background-color:transparent;padding:0px 40px">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    width="100%"
                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                    <tbody>
    
                                                                        <tr>
                                                                            <th valign="top"
                                                                                class="m_-4105437905510428836stack-column-center m_-4105437905510428836columns"
                                                                                width="100%" style="font-weight:400">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%"
                                                                                    style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                                                                                    <tbody>
    
                                                                                        <tr>
                                                                                            <td dir="ltr" valign="top"
                                                                                                style="padding:0px">
                                                                                                <table align="center"
                                                                                                    style="border-spacing:0px;table-layout:fixed;margin:0px auto;width:33%;min-width:33%;max-width:33%;border-collapse:separate!important"
                                                                                                    width="33%">
                                                                                                    <tbody>
    
                                                                                                        <tr>
                                                                                                            <td style="font-size:0px;height:15px;line-height:15px"
                                                                                                                height="15px">
                                                                                                                &nbsp;</td>
    
                                                                                                        </tr>
    
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="border-top:1px solid transparent">
                                                                                                            </td>
    
                                                                                                        </tr>
    
                                                                                                        <tr>
                                                                                                            <td style="font-size:0px;height:15px;line-height:15px"
                                                                                                                height="15px">
                                                                                                                &nbsp;</td>
    
                                                                                                        </tr>
    
                                                                                                    </tbody>
    
                                                                                                </table>
                                                                                            </td>
    
                                                                                        </tr>
    
                                                                                    </tbody>
    
                                                                                </table>
                                                                            </th>
                                                                        </tr>
    
                                                                    </tbody>
    
                                                                </table>
                                                            </td>
    
                                                        </tr>
    
                                                    </tbody>
    
                                                </table>
                                            </div>
                                        </td>
    
                                    </tr>
    
    
    
    
    
                                </tbody>
    
                            </table>
                            <div class="yj6qo"></div>
                            <div class="adL">
                            </div>
                        </div>
                        <div class="adL">
                        </div>
                    </div>
                    <div class="adL">
                    </div>
                    <div style="clear:both!important;height:0!important" class="adL"></div>
                </div>
                <div class="adL">
    
    
                </div>
            </div>
        </div>
        <div id=":ml" class="ii gt" style="display:none">
            <div id=":mk" class="a3s aiL "></div>
        </div>
        <div class="hi"></div>
    </div>
        `;
    }
}