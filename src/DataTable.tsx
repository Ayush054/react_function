import  { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const DataTable = () => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 500 },
  ];

  return (
    
        <Container component="main" fixed maxWidth="md" sx={{
        marginTop: 4,
       alignItems: 'center',
        height: 400, width: "100%"
      }}>
 <Typography component="h5" variant="h5">Data Table</Typography>
      <DataGrid
        rows={data}
        columns={columns}
       
        initialState={{
         pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        />
        </Container>

  );
};

export default DataTable;
