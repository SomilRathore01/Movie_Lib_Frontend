import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const Authform = ({onSubmit, isAdmin}) => {

    const [Inputs, setInputs] = useState({
        name:"", email:"", password:""
    })
    const handleChange =  (e) => {
        setInputs((prevState)=> ({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({Inputs, signup: isAdmin?false: isSignup});
    }

    const [isSignup, setisSignup] = useState(false);

  return (
    <>
    <Dialog PaperProps={{style:{borderRadius: 10}}} open={true} sx={{background:"linear-gradient(#232D3F, #005B41)"}}>
        <div style={{background:"#414241"}}>
            <Box sx={{padding: 1}}>
                <IconButton>
                    <CloseIcon/>
                </IconButton>
            </Box>
        <Typography variant='h4' textAlign={"center"} color={"white"}>
            {!isSignup?"Login": "Signup"}
        </Typography>
        <form onSubmit={handleSubmit}>
            <Box padding={6} display={'flex'} justifyContent={'center'} flexDirection={'column'} width={400} margin={'auto'}>
                {!isAdmin && isSignup && ( <>
                {""}
                <FormLabel sx={{color: "white", marginTop: 1}}>Name<br/></FormLabel>
                <TextField value={Inputs.name} onChange={handleChange} sx={{marginBottom: '2vh'}}variant='standard' type='text' name='name' />
                </>
                )}
                <FormLabel sx={{color: "white", marginTop: 1}}>Email<br/></FormLabel>
                <TextField value={Inputs.email} onChange={handleChange} sx={{marginBottom: '2vh'}}variant='standard' type='email' name='email' />
                <FormLabel sx={{color: "white", marginTop: 1}}>Password</FormLabel>
                <TextField value={Inputs.password} onChange={handleChange} sx={{marginBottom: '2vh'}} variant='standard' type='password' name='password' />

                    <Button sx={{border:"1px solid black", width: 100, margin: 'auto', mt: 3, color: "white", background:"linear-gradient(#0F0F0F, #232D3F, #005B41)", ":hover": {background: "white", color: "#005B41"}}} type="submit" variant='contained'>
                    {!isSignup?"Login": "Signup"} 
                    </Button>
                {!isAdmin && (
                    <Button onClick={()=> setisSignup(!isSignup)} sx={{width:250, margin: 'auto', ":hover": {color: "white"}}}>
                    {isSignup?"Account Already Exists": "Create New Account"}
                    </Button>
                )}
            </Box>
        </form>
        </div>
    </Dialog>
    </>
  )
}

export default Authform
