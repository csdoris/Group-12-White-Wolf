import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Weather you are ready
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}