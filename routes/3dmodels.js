
app.get('/models/:group', (req, res) => {
    res.status(200).json({message: `All videos for ${req.params.group}`});
});

app.post('/models/:group', (req, res) => {
    res.status(200).json({message: `All videos for ${req.params.group}`});
});