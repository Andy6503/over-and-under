import React from "react";
import { Link } from "react-router-dom";
import { CardActionArea } from "@mui/material";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function FavoriteCard({ recipe, onDelete }) {
  function handleClick() {
    console.log(recipe);
    fetch(`http://localhost:8000/recipes/${recipe.id}`, {
      method: "DELETE",
    })
      .then(resp => resp.json())
      .then(() => onDelete(recipe.id));
  }

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let extractedId = recipe.image.split('/recipeImages/')[1].split('-')[0]

  return (
    <div className={`favoritelist-animation-${recipe.id}`}>
      <Card variant="outlined" sx={{ maxWidth: 305, boxShadow: 1, p: 2}}>
      <CardActionArea>
      <CardHeader
        title={recipe.title}
        className="recipecard-header"
      />
      <CardMedia
        component="img"
        height="194"
        image={recipe.image}
        alt={recipe.title}
      />
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="Delete">
          <DeleteOutlineOutlinedIcon onClick={handleClick}/>
        </IconButton>
        <Link to={`/reciperesults/${extractedId}`}>
        <IconButton>
        <RestaurantOutlinedIcon />
        </IconButton></Link>
        <Typography variant="h6" style={{paddingLeft: "50px"}}>Nutrition</Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <li>{recipe.calorie} : {recipe.calorieAmount} kcal</li>
            <li>{recipe.protein} : {recipe.proteinAmount} g</li>
            <li>{recipe.carb} : {recipe.carbAmount} g</li>
          </Typography>
        </CardContent>
      </Collapse>
      </Card>
    </div>
  );
}

export default FavoriteCard;