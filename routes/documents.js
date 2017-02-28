
app.get('/documents/:group', (req, res) => {
    res.status(200).json({message: `All videos for ${req.params.group}`});
});

app.post('/documents/:group', (req, res) => {
    res.status(200).json({message: `All videos for ${req.params.group}`});
});