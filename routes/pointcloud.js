
app.get('/pointcloud/:group', (req, res) => {
    res.status(200).json({message: `All videos for ${req.params.group}`});
});

app.post('/pointcloud/:group', (req, res) => {
    res.status(200).json({message: `All videos for ${req.params.group}`});
});