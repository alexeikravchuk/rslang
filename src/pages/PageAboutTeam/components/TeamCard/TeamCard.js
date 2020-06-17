import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './TeamCard.scss'

  export default function TeamCard({ card }) {

    return (
      <Card className='card'>
        <CardMedia
          component="img"
          alt= { card.title }
          image={ card.image }
          title= { card.title }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
             { card.title }
          </Typography>
          <Typography variant="body2">
            { card.description }
          </Typography>
        </CardContent>
      </Card>
    );
  }
