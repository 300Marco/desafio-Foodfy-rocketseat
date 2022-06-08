module.exports = {
    passwordResetEmail(token, name) {
        return `
        <div class="">
        <div class="aHl"></div>
        <div id=":kc" tabindex="-1"></div>
        <div id=":k1" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0.">
            <div id=":k0" class="a3s aiL msg-9110576154220968090"><u></u>
                <div style="margin:0;padding:0;background-color:#f1f1f1">
                    <table style="min-width:320px;background-color:#f1f1f1" width="100%" cellspacing="0" cellpadding="0">
    
                        <tbody>
                            <tr>
                                <td style="line-height:0">
                                    <div style="display:none;white-space:nowrap;font:15px/1px courier">&nbsp; &nbsp; &nbsp;
                                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:40px 10px 40px">
                                    <table width="600" align="center" style="margin:0 auto" cellpadding="0" cellspacing="0">
    
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table width="600" cellpadding="0" cellspacing="0"
                                                        style="width:600px!important">
                                                        <tbody>
                                                            <tr>
                                                                <td style="min-width:600px;font-size:0;line-height:0">&nbsp;
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
    
                                            <tr>
                                                <td style="padding:0 0 58px">
                                                    <table width="100%" cellpadding="0" cellspacing="0">
                                                        <tbody>
                                                            <tr>
                                                                <td style="padding:62px 40px 60px;background-color:#ffffff">
                                                                    <h1
                                                                        style="font:32px/36px Helvetica,Arial,sans-serif;color: #6558C3;letter-spacing:0.5px;padding:0 0 36px;margin:0">
                                                                        <strong> Olá ${name}, perdeu a senha?</strong>
                                                                    </h1>
                                                                    <p
                                                                        style="font:16px/24px Helvetica,Arial,sans-serif;color:#757575;padding:0 0 22px;margin:0">
                                                                        Fique tranquilo(a)!</p>
                                                                    <p
                                                                        style="font:16px/24px Helvetica,Arial,sans-serif;color:#757575;padding:0 0 22px;margin:0">
                                                                        Iremos te ajudar com a recuperação de sua senha.</p>
                                                                    <p
                                                                        style="font:16px/24px Helvetica,Arial,sans-serif;color:#757575;padding:0 0 22px;margin:0">
                                                                        Caso você não tenha solicitado esta recuperação, por favor, desconsiderar este email.</p>
                                                                    <p
                                                                        style="font:16px/24px Helvetica,Arial,sans-serif;color:#757575;padding:0 0 22px;margin:0">
                                                                        Clique no link abaixo, para cadastrar uma nova
                                                                        senha.</p>
    
    
                                                                    <h5
                                                                        style="padding:13px 0;margin:0 auto;text-align:center;width:257px">
                                                                        <a href="http://localhost:3000/admin/password-reset?token=${token}"
                                                                            style="display:block;color:#fafafa;font:bold 16px/48px Arial,Helvetica,sans-serif;text-transform:uppercase;border-radius:2px;background-color: #6558C3;text-decoration:none!important;outline:none"
                                                                            target="_blank"
                                                                            data-saferedirecturl="https://www.google.com/url?q=https://accounts.getkeepsafe.com/redirect/inactive/fepSy7yES8e9qGnILdgjqg/unknown?locale%3Den&amp;source=gmail&amp;ust=1654740898358000&amp;usg=AOvVaw3kSvZQ0_OqCJa16EP9dI1r">Acessar
                                                                            Foodfy</a>
                                                                    </h5>
                                                                    <p
                                                                        style="font:16px/24px Helvetica,Arial,sans-serif;color:#757575;padding: 40px 0 0;margin:0">
                                                                        Equipe Foody</p>
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
                </div>
            </div>
        </div>
    </div>
        `;
    },
    sendAccessEmail(name, password) {
        return `
            <div class="">
            <div class="aHl"></div>
            <div id=":kc" tabindex="-1"></div>
            <div id=":k1" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0.">
                <div id=":k0" class="a3s aiL msg-9110576154220968090"><u></u>
                    <div style="margin:0;padding:0;background-color:#f1f1f1">
                        <table style="min-width:320px;background-color:#f1f1f1" width="100%" cellspacing="0" cellpadding="0">
        
                            <tbody>
                                <tr>
                                    <td style="line-height:0">
                                        <div style="display:none;white-space:nowrap;font:15px/1px courier">&nbsp; &nbsp; &nbsp;
                                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:40px 10px 40px">
                                        <table width="600" align="center" style="margin:0 auto" cellpadding="0" cellspacing="0">
        
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <table width="600" cellpadding="0" cellspacing="0"
                                                            style="width:600px!important">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="min-width:600px;font-size:0;line-height:0">&nbsp;
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
        
                                                <tr>
                                                    <td style="padding:0 0 58px">
                                                        <table width="100%" cellpadding="0" cellspacing="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="padding:62px 40px 60px;background-color:#ffffff">
                                                                        <h1
                                                                            style="font:32px/36px Helvetica,Arial,sans-serif;color: #6558C3;letter-spacing:0.5px;padding:0 0 36px;margin:0">
                                                                            <strong> Bem vindo(a), ${name} =) </strong></h1>
                                                                        <p
                                                                            style="font:16px/24px Helvetica,Arial,sans-serif;color:#757575;padding:0 0 22px;margin:0">
                                                                            Estamos muito felizes em tê-lo conosco!</p>
                                                                        <p
                                                                            style="font:16px/24px Helvetica,Arial,sans-serif;color:#757575;padding:0 0 22px;margin:0">
                                                                            Esta é sua senha de acesso gerada automaticamente,
                                                                            para mudá-la basta clicar em "Perdeu a senha" na
                                                                            página de login.</p>
                                                                        <p
                                                                            style="font:16px/24px Helvetica,Arial,sans-serif;color:#757575;padding:0 0 22px;margin:0">
                                                                            Caso você não seja ${name}, por favor, desconsiderar
                                                                            este email.</p>
                                                                        <p
                                                                            style="font:16px/24px Helvetica,Arial,sans-serif;color:#757575;padding:0 0 22px;margin:0">
                                                                            Sua senha de acesso é:</p>
                                                                        <p
                                                                            style="font-family: Helvetica,Arial,sans-serif;/* color:#757575; */font-size:28px;color:rgb(54,70,86);line-height:150%;text-align:center;padding-top:18px;padding-bottom:18px;word-break:break-word;margin:0px;overflow:hidden;">
                                                                            <strong> ${password} </strong>
                                                                        </p>
                                                                        <h5
                                                                            style="padding:13px 0;margin:0 auto;text-align:center;width:257px">
                                                                            <a href="http://localhost:3000/admin/users/login"
                                                                                style="display:block;color:#fafafa;font:bold 16px/48px Arial,Helvetica,sans-serif;text-transform:uppercase;border-radius:2px;background-color: #6558C3;text-decoration:none!important;outline:none"
                                                                                target="_blank"
                                                                                data-saferedirecturl="https://www.google.com/url?q=https://accounts.getkeepsafe.com/redirect/inactive/fepSy7yES8e9qGnILdgjqg/unknown?locale%3Den&amp;source=gmail&amp;ust=1654740898358000&amp;usg=AOvVaw3kSvZQ0_OqCJa16EP9dI1r">Acessar
                                                                                Foodfy</a></h5>
                                                                        <p
                                                                            style="font:16px/24px Helvetica,Arial,sans-serif;color:#757575;padding: 40px 0 0;margin:0">
                                                                            Equipe Foody</p>
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
                    </div>
                </div>
            </div>
            </div>
        `;
    }
}