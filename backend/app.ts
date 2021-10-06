import server from 'io';

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
