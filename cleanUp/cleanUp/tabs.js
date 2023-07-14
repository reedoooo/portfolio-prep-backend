const express = require("express");
const router = express.Router();
const Tab = require("../../models/TabModel");
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG_KEY,
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// POST request to create a new tab
router.post("/tabs", async (req, res) => {
    try {
      const tab = new Tab(req.body);
      await tab.save();
      res.status(201).json(tab);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


router.get('/tabs', async (request, response) => {
    const tabs = await Tab.find({ email: request.user.email });

    // const sendTabs = tabs.map(async (tab) => {
    //     const popTabs = await Tab.findById(tab._id).populate({
    //         path: 'pages',
    //     });

        // return popBooks;
    // });
    console.log('**************sendTabs************');
    console.log(tabs);

    if (tabs.length > 0) {
        response.status(200).json(tabs);
    } else {
        response.status(201).send([]);
    }
});

router.post('/', async (request, response) => {
    
    const { title, linkURL, imageURL, size } = request.body;

    console.log(request.body);
    console.log(title);
    console.log(linkURL);
    console.log(imageURL);
    console.log(size);

    try {
        const newTab = await Tab.create({
            title: title,
            linkURL: linkURL,
            size: size,
            imageURL: imageURL,
            email: request.user.email,
        });
        response.status(200).json(newTab);
    } catch (error) {
        console.error(error);
        console.log('we have failed once again');
        response.status(500).json('there was an error post');
    }
});

 router.put('/api/tabs/:id', async (request, response) => {
    const id = request.params.id;
    const { email } = request.user.email;
 
    try {
        const tab = await Tab.findOne({ _id: id, email: email });
        if (!tab) {
            response.status(400).send('unable to update tab');
        } else {
            let updatedTab = await Tab.findByIdAndUpdate(id, request.body, { new: true });
            response.status(202).json(updatedTab);
        }
    } catch (error) {
        response.status(404).send('unable to update');
        console.error(error);
    }
}); 

router.delete('/:id', async (request, response) => {
    const id = request.params.id;
    const email = request.user.email;
    const deleteTab = await Tab.findOne({ _id: id, email: email });

    try {
        if (deleteTab) {
            await Tab.findByIdAndDelete(id);
            response.status(200).send(`successfully deleted ${id}`);
        } else {
            response.status(404).send(`unable to find tab with id ${id}`);
        }
    } catch (error) {
        response.status(404).send(`unable to delete tab with id ${id}`);
    }
});

module.exports = router;
