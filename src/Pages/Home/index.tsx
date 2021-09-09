import '../../Styles/Pages/Home/index.css'
import img_indexJokes from '../../Sources/img/33365.jpg'
import { Button as ButtonStyles } from '../../Styles/Components/items/button';
import { FaRegLaughBeam } from 'react-icons/fa'
import { Button, Checkbox, createStyles, FormControlLabel, makeStyles, TextField, Theme } from '@material-ui/core';
import { FormEvent, useState } from 'react';
import apiMain from '../../Services/api'
import { ComponentShowData } from '../../Components/ShowData';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '100%',
            },
        },
    }),
);
function IndexPage() {
    /**
     * Page Initial Index
     * Function Direciton other pages
     *  Gutierrez Henrique
     **/

    const [hiddenName, setHiddenName] = useState(true);
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [data, setData] = useState("");

    const [state, setState] = useState({
        checkedA: true,
        checkedB: true,
    });

    function goSearchName(e: FormEvent) {
        e.preventDefault();
        apiMain.get(`jokes/random?firstName=${name}&lastName=${lastName}&limitTo=[${state.checkedA ? "explicit" : ""}${state.checkedA && state.checkedB ? "," : ""}${state.checkedB ? "nerdy": ""}]`)
            .then(response => {
                setOpen(true);
                setData(response.data.value.joke)
            })
    }

    function refresh() {
        apiMain.get(`jokes/random?firstName=${name}&lastName=${lastName}&limitTo=[${state.checkedA ? "explicit" : ""}${state.checkedA && state.checkedB ? "," : ""}${state.checkedB ? "nerdy": ""}]`)
            .then(response => {
                setOpen(true);
                setData(response.data.value.joke)
            })
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div id="indexPage">
            <div>
                Bem vindo, vamos nos divertir? <FaRegLaughBeam size={30} color="d98c09" />
                <img src={img_indexJokes} alt="Jokes" />
                {hiddenName ?
                    <ButtonStyles onClick={() => { setHiddenName(false) }}>
                        Vamos lá?
                    </ButtonStyles>
                    :
                    <div>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField label="Nome" variant="filled"
                                value={name} onChange={(e) => { setName(e.target.value) }}
                            />
                            <TextField label="Sobrenome" variant="filled"
                                value={lastName} onChange={(e) => { setLastName(e.target.value) }}
                            />
                            Filtro
                            <div>
                                <FormControlLabel
                                    control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                                    label="Explicito"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.checkedB}
                                            onChange={handleChange}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Nerd"
                                />
                            </div>
                            <Button variant="outlined" color="primary"
                                onClick={(e) => { goSearchName(e) }}
                            >
                                CONFIRMAR
                            </Button>
                        </form>
                    </div>
                }

                <ComponentShowData open={open} data={data} onRequestClose={() => { setOpen(false) }}
                    reload={() => { refresh() }}
                />
            </div>
        </div>
    )


}

export default IndexPage;