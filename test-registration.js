// Simple test script to verify registration functionality
const testRegistration = async () => {
  try {
    console.log('Testing registration API...');
    
    // Test PUBG registration
    const pubgResponse = await fetch('/api/register/pubg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teamName: 'Test Team',
        leaderName: 'Test Leader',
        leaderWhatsApp: '1234567890',
        leaderPUBGId: '123456789',
        player2: { name: 'Player 2', gameId: '987654321' },
        player3: { name: 'Player 3', gameId: '111111111' },
        player4: { name: 'Player 4', gameId: '222222222' },
        paymentScreenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
        transactionId: 'TEST123',
        liveStreamVote: 'yes',
        agreedToTerms: true
      })
    });
    
    console.log('PUBG Registration Response:', pubgResponse.status);
    
    // Test Free Fire registration
    const ffResponse = await fetch('/api/register/freefire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teamName: 'FF Test Team',
        leaderName: 'FF Leader',
        leaderWhatsApp: '1234567890',
        leaderUID: 'FF123456',
        player2: { name: 'FF Player 2', gameId: 'FF987654' },
        player3: { name: 'FF Player 3', gameId: 'FF111111' },
        player4: { name: 'FF Player 4', gameId: 'FF222222' },
        paymentScreenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
        transactionId: 'FFTEST123',
        liveStreamVote: 'no',
        agreedToTerms: true
      })
    });
    
    console.log('Free Fire Registration Response:', ffResponse.status);
    
    // Test stats API
    const statsResponse = await fetch('/api/stats');
    const stats = await statsResponse.json();
    console.log('Stats:', stats);
    
  } catch (error) {
    console.error('Test failed:', error);
  }
};

// Run test
testRegistration();