using FinancialManagementSystem.BLL.Services;
using StackExchange.Redis;

namespace FinancialManagementSystem.BLL
{
    public class TokenBlacklistService : ITokenBlacklistService
    {
        private readonly IDatabase _redis;

        public TokenBlacklistService(IConnectionMultiplexer redis)
        {
            _redis = redis.GetDatabase();
        }

        public async Task BlacklistTokenAsync(string token, TimeSpan expiry)
        {
            await _redis.StringSetAsync(GetKey(token), "blacklisted", expiry);
        }

        public async Task<bool> IsTokenBlacklistedAsync(string token)
        {
            return await _redis.KeyExistsAsync(GetKey(token));
        }

        private string GetKey(string token) => $"blacklist:{token}";
    }

}
