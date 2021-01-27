import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

const GET_ALL_THE_THINGS_QUERY = gql`
  query GetAllTheThings {
    brands {
      id
      name
    }
    products {
      id
      name
      brand {
        id
        name @client
        # Look ma, no name!
      }
    }
  }
`;

export const ProductList: React.FC = () => {
  const queryResults = useQuery(GET_ALL_THE_THINGS_QUERY);
  const { loading, error, data } = queryResults;

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;
  const { products } = data;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Brand Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((p: any) => {
          return (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.brand.name}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
