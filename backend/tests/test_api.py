import unittest
from fastapi import HTTPException

from api.cms import list_artists, get_artist, list_pieces, get_piece
from main import health


class BackendApiTests(unittest.TestCase):
    def test_health_function_returns_ok_status(self):
        payload = health()
        self.assertEqual(payload['status'], 'ok')
        self.assertEqual(payload['service'], 'unsweet-api')

    def test_list_artists_returns_non_empty_list(self):
        payload = list_artists()
        self.assertIsInstance(payload, list)
        self.assertGreaterEqual(len(payload), 1)

    def test_featured_artists_filter_returns_only_featured_items(self):
        payload = list_artists(featured=True)
        self.assertTrue(all(item.featured is True for item in payload))

    def test_get_artist_returns_404_for_unknown_slug(self):
        with self.assertRaises(HTTPException) as context:
            get_artist('not-a-real-artist')
        self.assertEqual(context.exception.status_code, 404)
        self.assertEqual(context.exception.detail, 'Artist not found')

    def test_pieces_filter_by_artist_id_returns_only_requested_artist(self):
        payload = list_pieces(artist_id='1')
        self.assertTrue(all(piece.artist_id == '1' for piece in payload))


if __name__ == '__main__':
    unittest.main()
