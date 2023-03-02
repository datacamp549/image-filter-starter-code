import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

import { Router, Request, Response } from 'express';

//const router: Router = Router();

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  //URL to use for image http://localhost:8082/filteredimage?image_url=https://www.audi.com/content/dam/gbp2/de/company/investor-relations/reports-and-key-figures/annual-reports/2022/Audi_GB_Social_16x9_Artikel_DE.jpg

  app.get( "/filteredimage/", async ( req, res ) => {
    console.log("/filteredimage/");
    let { image_url } = req.query;

    if ( !image_url ) {
      return res.status(400)
                .send(`Please specify an URL of an public image! --> /filteredimage?image_url=<URL>`);
    }
    console.log(image_url);

  
    const FilteredImage = await filterImageFromURL(image_url as string);

    console.log("Path: "+ FilteredImage);

    res.status(200)
              .sendFile(FilteredImage, () => {
                console.log("Delete file "+FilteredImage);
                deleteLocalFiles([FilteredImage]);
              });           
  } );

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    console.log("URL:");
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();