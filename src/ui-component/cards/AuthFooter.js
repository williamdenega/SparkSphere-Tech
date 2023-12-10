// material-ui
import { Link, Typography, Stack, Box } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import { IconBrandPaypalFilled } from '@tabler/icons-react';
import InstagramIcon from '@mui/icons-material/Instagram';
// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Box display="flex" flexDirection="row" alignItems="center">
            <Typography
                variant="subtitle2"
                component={Link}
                href="https://www.paypal.com/donate/?business=VADKX8EF29HA4&amount=1&no_recurring=1&item_name=Buy+me+a+Coffee?&currency_code=USD"
                target="_blank"
                underline="hover"
            >
                Buy me 1/4 of a Coffee?
            </Typography>
        </Box>
        <Box>
            <Typography
                variant="subtitle2"
                component={Link}
                href="https://www.linkedin.com/in/william-denega-351954159"
                target="_blank"
                underline="hover"
            >
                <LinkedInIcon />
            </Typography>
            <Typography
                variant="subtitle2"
                component={Link}
                href="https://www.instagram.com/williamdenega/"
                target="_blank"
                underline="hover"
            >
                <InstagramIcon />
            </Typography>
        </Box>
    </Stack>
);

export default AuthFooter;
