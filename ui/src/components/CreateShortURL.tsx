import { Input, Button, Box, Heading, InputGroup } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const SERVER_ENDPOINT =
  process.env.REACT_APP_SERVER_ENDPOINT || "http://localhost:4000";

function CreateShortURL() {
  const [destination, setDestination] = useState("");
  const [shortUrl, setShortUrl] = useState<{
    shortId: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await axios
      .post(`${SERVER_ENDPOINT}/api/url`, {
        destination,
      })
      .then((resp) => resp.data);

    setShortUrl(result);
    setDestination("");
  }

  return (
    <Box pos="relative" zIndex="2" bg="white" padding="6">
      <Heading marginBottom="4">Create a short URL</Heading>

      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            onChange={(e) => setDestination(e.target.value)}
            placeholder="https://example.com"
          />
          <Button type="submit">CREATE</Button>
        </InputGroup>
      </form>
      <hr />
      {shortUrl && (
        <a href={`${SERVER_ENDPOINT}/${shortUrl.shortId}`}>
          {SERVER_ENDPOINT}/{shortUrl.shortId}
        </a>
      )}
    </Box>
  );
}

export default CreateShortURL;
