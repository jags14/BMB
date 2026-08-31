import logo from './logo.svg';
import './App.css';
import Books from './components/Books/Book';

function App() {
  return (
    <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">
                    Book My Book
                </Typography>
                
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Books/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Books />
                        </Grid>

                    </Grid>
                </Container>
            </Grow>
    </Container>
  );
}

export default App;
