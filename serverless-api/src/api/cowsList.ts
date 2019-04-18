export async function cowsList(req, res, dynamoDb, COWS_TABLE) {

    const params = {
      TableName: COWS_TABLE,
      ProjectionExpression: '#k, #t, options, created',
      ExpressionAttributeNames: { '#k': 'key', '#t': 'text' },
      // ExpressionAttributeValues: {
      //     ':s': { N: '2' },
      //     ':e': { N: '09' },
      //     ':topic': { S: 'PHRASE' },
      //   },
    }

    try {
      let data = await dynamoDb.scan(params).promise()
      res.json({ data })
    } catch (error) {
      console.log(error)
      res.status(400).json({ errorMessage: 'Could not list cows', error })
    }
  
}