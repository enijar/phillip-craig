<?php

namespace App\PhillipCraig\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

class SendGrid
{
    private $endpoint = 'https://api.sendgrid.com/v3';

    /**
     * Add contact to global list.
     *
     * @param string $email
     */
    public function addContact(string $email)
    {
        $this->sendRequest('POST', 'contactdb/recipients', [
            'body' => json_encode([compact('email')]),
        ]);
    }

    /**
     * Add recipient contact to list.
     *
     * @param int $listId
     * @param string $email
     */
    public function addRecipientToList(int $listId, string $email)
    {
        $this->sendRequest('POST', "contactdb/lists/{$listId}/recipients/{$this->getRecipientId($email)}");
    }

    /**
     * Delete recipient contact from list.
     *
     * @param int $listId
     * @param string $email
     */
    public function removeRecipientToList(int $listId, string $email)
    {
        $this->sendRequest('DELETE', "contactdb/lists/{$listId}/recipients/{$this->getRecipientId($email)}");
    }

    /**
     * Get base64 string of email.
     *
     * @param string $email
     * @return string
     */
    private function getRecipientId(string $email): string
    {
        return base64_encode($email);
    }

    /**
     * Send payload to endpoint for processing.
     *
     * @param string $method
     * @param string $uri
     * @param array $options
     * @return string|null
     */
    private function sendRequest(string $method, string $uri, $options = [])
    {
        $client = new Client();
        $token = env('SENDGRID_API_KEY');

        if (!isset($options['headers'])) {
            $options['headers'] = [];
        }

        $options['headers']['Authorization'] = "Bearer {$token}";

        try {
            $response = $client->request($method, "{$this->endpoint}/{$uri}", $options);
            return (string)$response->getBody();
        } catch (GuzzleException $exception) {
            Log::error($exception->getMessage());
            return null;
        }
    }
}
