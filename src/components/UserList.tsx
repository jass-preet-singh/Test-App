import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    CircularProgress,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Alert,
    Pagination,
    TextField,
    Paper,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchUsers } from "../redux/user/userSlice";
import { User } from "../redux/user/userTypes";

const UserList = () => {
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const filteredUsers = users.filter((user: User) =>
        user.name.toLowerCase().includes(searchTerm?.trim()?.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Box
                    sx={{
                        maxWidth: 1400,
                    }}
                >
                    {/* Search Box */}
                    <Box display={'flex'} justifyContent={"start"} >
                        <TextField
                            label="Search by Name"
                            variant="outlined"
                            margin="normal"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{
                                width: "300px", 
                                "& .MuiInputLabel-root": {
                                  fontSize: "14px", // Adjust label size if needed
                                }
                              }}
                        />
                    </Box>

                    {/* Loading State */}
                    {loading && (
                        <Box display="flex" justifyContent="center" my={3}>
                            <CircularProgress />
                        </Box>
                    )}

                    {/* Error Message */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            Failed to load users: {error}
                        </Alert>
                    )}

                    {/* User Table */}
                    {!loading && !error && (
                        <TableContainer component={Paper} sx={{ maxWidth: "100%", overflowX: "auto",  }} >
                            <Table sx={{ minWidth: 650, }} aria-label="user table">
                                <TableHead sx={{ bgcolor: "primary.main" }}>
                                    <TableRow>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Id</TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Avatar</TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Company Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentUsers?.length > 0 ? (
                                        currentUsers.map((user, index) => (
                                            <TableRow key={user.id} sx={{ bgcolor: index % 2 === 0 ? "background.default" : "action.hover" }}>
                                                <TableCell>{user.id}</TableCell>
                                                <TableCell>
                                                    <Avatar src={`https://i.pravatar.cc/50?u=${user.id}`} alt={user.name} />
                                                </TableCell>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.company || "Infosys"}</TableCell>
                                            </TableRow>
                                        ))) : (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center" sx={{ py: 3, fontSize: 16, fontWeight: "bold", color: "text.secondary" }}>
                                                No records found!
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            {/* Pagination */}
                        </TableContainer>
                    )}
                    {totalPages > 1 && (
                        <Box display="flex" justifyContent="center" mt={2}  >
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(_, value) => setCurrentPage(value)}
                                color="primary"
                            />
                        </Box>
                    )}
                </Box>
            </Container>
        </>
    )
}

export default UserList