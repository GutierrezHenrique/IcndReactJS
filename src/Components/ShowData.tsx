import Button from '@material-ui/core/Button';
import { FaExchangeAlt } from 'react-icons/fa';
import '../Styles/Components/openShow.css'
import { FcIdea } from 'react-icons/fc'
import { createStyles, makeStyles, Theme } from '@material-ui/core';

interface NewTransactionModalProps {
    onRequestClose: () => void;
    open: Boolean;
    data: string;
    reload: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        space: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

export function ComponentShowData({ open, onRequestClose, data, reload }: NewTransactionModalProps) {
    const classes = useStyles();


    if (open)
        return (
            <div id="ShowData">
                <FcIdea />
                Descubra oque Chuck Norris falou sobre você...
                <b>{data}</b>

                <div className={classes.space} >

                    <Button variant="outlined" color="primary" onClick={() => onRequestClose()}>
                        <FaExchangeAlt size={20} style={{ paddingRight: '.4rem' }} /> OUTRO NOME
                    </Button>

                    <Button variant="outlined" color="secondary" onClick={() => reload()}>
                        OUTRA FRASE
                    </Button>
                </div>
            </div>
        )
    else return (<></>);
}
