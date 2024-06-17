# Artifact-Archive

A Game where the player can describe and classify randomly generated artifacts. Still a work in progress.

## Approach

An object called "artifactClass" that has only methods and an appearance property (thats added in general functions 1 & 2). The player can use these methods to create their own properties.

An array called "Collection" that stores all created artifacts

General Functions 1 & 2 create a randomly generated artifact for the user to describe.

An object called "artifactModifiers" that has all the potential attributes an artifact can have.

## Functions Used

### Artifact Object Functions

1. setProperty(propertyName, value="") - sets a property [propertyName] with given value [value]. Creates the property if it doesn't exists. Value is optional.

2. hasProperty(propertyName) - returns true if artifact has a property called [propertyName] and false otherwise. Used for filtering.

3. getPropertyValue(propertyName) - get the value of given artifact property.

4. getAllProperties() - returns string detailing all properties that are not functions or artifact appearance

### Collection Functions

1. getCollection() - return all artifacts in collection array

2. getCollectionLength() - get length of collection array

3. filterCollectionByProperty(propertyName) - returns a filtered array of artifacts with given propertyName

4. filterCollectionByPropertyValue(propertyName, expectedValue) - returns a filtered array of artifacts with given propertyName AND expected value

### General Functions

1. discoverArtifact() - Creates a new artifact with all properties/methods from artifact object. Attach an appearance property created by createRandomArtifact function. Display artifact appearance in display and in artifact collection array.

2. createRandomArtifact() - creates and returns a random artifact's appearance (html elements). Uses the artifactModifiers' object to keep track of all possible attributes.

3. getAllProperties() - run artifact.getAllProperties() function on current artifact and display results in search results

## Challenges

Initial challenges where trying to think abstractly on what functions I would need for the artifact object. Such as determining if their should be a "global" default artifact object that all other artifacts inherit from, or just using "local" artifacts.

## Next Steps

- implement visual search results that are linked to text properties

- implement "orders / checks" for the player to determine if they've seen specific artifact attributes.

- implement more unique artifact shapes and shading
