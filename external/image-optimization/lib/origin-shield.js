"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOriginShieldRegion = void 0;
// All regions and their ordering are taken from
// https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html
// Regions with Regional Edge Caches
const REC_REGIONS = {
    US_EAST_2: "us-east-2", //  1. US East (Ohio)
    US_EAST_1: "us-east-1", //  2. US East (N. Virginia) 
    US_WEST_2: "us-west-2", //  3. US West (Oregon) 
    AP_SOUTH_1: "ap-south-1", //  4. Asia Pacific (Mumbai) 
    AP_NORTHEAST_2: "ap-northeast-2", //  5. Asia Pacific (Seoul) 
    AP_SOUTHEAST_1: "ap-southeast-1", //  6. Asia Pacific (Singapore)
    AP_SOUTHEAST_2: "ap-southeast-2", //  7. Asia Pacific (Sydney)
    AP_NORTHEAST_1: "ap-northeast-1", //  8. Asia Pacific (Tokyo)
    EU_CENTRAL_1: "eu-central-1", //  9. Europe (Frankfurt)
    EU_WEST_1: "eu-west-1", // 10. Europe (Ireland)
    EU_WEST_2: "eu-west-2", // 11. Europe (London)
    SA_EAST_1: "sa-east-1", // 12. South America (São Paulo)
};
// Other supported regions
const OTHER_REGIONS = {
    US_WEST_1: "us-west-1", // 13. US West (N. California)
    AF_SOUTH_1: "af-south-1", // 14. Africa (Cape Town)
    AP_EAST_1: "ap-east-1", // 15. Asia Pacific (Hong Kong)
    CA_CENTRAL_1: "ca-central-1", // 16. Canada (Central)
    EU_SOUTH_1: "eu-south-1", // 17. Europe (Milan)
    EU_WEST_3: "eu-west-3", // 18. Europe (Paris)
    EU_NORTH_1: "eu-north-1", // 19. Europe (Stockholm)
    ME_SOUTH_1: "me-south-1", // 20. Middle East (Bahrain)
};
// Region to Origin Shield mappings based on latency.
// To be updated when new Regions are available or new RECs are added to CloudFront.
const REGION_TO_ORIGIN_SHIELD_MAPPINGS = new Map([
    [REC_REGIONS.US_EAST_2, REC_REGIONS.US_EAST_2], //  1.
    [REC_REGIONS.US_EAST_1, REC_REGIONS.US_EAST_1], //  2.
    [REC_REGIONS.US_WEST_2, REC_REGIONS.US_WEST_2], //  3.
    [REC_REGIONS.AP_SOUTH_1, REC_REGIONS.AP_SOUTH_1], //  4.
    [REC_REGIONS.AP_NORTHEAST_2, REC_REGIONS.AP_NORTHEAST_2], //  5.
    [REC_REGIONS.AP_SOUTHEAST_1, REC_REGIONS.AP_SOUTHEAST_1], //  6.
    [REC_REGIONS.AP_SOUTHEAST_2, REC_REGIONS.AP_SOUTHEAST_2], //  7.
    [REC_REGIONS.AP_NORTHEAST_1, REC_REGIONS.AP_NORTHEAST_1], //  8.
    [REC_REGIONS.EU_CENTRAL_1, REC_REGIONS.EU_CENTRAL_1], //  9.
    [REC_REGIONS.EU_WEST_1, REC_REGIONS.EU_WEST_1], // 10.
    [REC_REGIONS.EU_WEST_2, REC_REGIONS.EU_WEST_2], // 11.
    [REC_REGIONS.SA_EAST_1, REC_REGIONS.SA_EAST_1], // 12.
    [OTHER_REGIONS.US_WEST_1, REC_REGIONS.US_WEST_2], // 13.
    [OTHER_REGIONS.AF_SOUTH_1, REC_REGIONS.EU_WEST_1], // 14.
    [OTHER_REGIONS.AP_EAST_1, REC_REGIONS.AP_SOUTHEAST_1], // 15.
    [OTHER_REGIONS.CA_CENTRAL_1, REC_REGIONS.US_EAST_1], // 16.
    [OTHER_REGIONS.EU_SOUTH_1, REC_REGIONS.EU_CENTRAL_1], // 17.
    [OTHER_REGIONS.EU_WEST_3, REC_REGIONS.EU_WEST_2], // 18.
    [OTHER_REGIONS.EU_NORTH_1, REC_REGIONS.EU_WEST_2], // 19.
    [OTHER_REGIONS.ME_SOUTH_1, REC_REGIONS.AP_SOUTH_1], // 20.
]);
const getOriginShieldRegion = (region) => {
    const originShieldRegion = REGION_TO_ORIGIN_SHIELD_MAPPINGS.get(region);
    if (originShieldRegion === undefined)
        throw new Error(`The specified region ${region} is not supported.`);
    return originShieldRegion;
};
exports.getOriginShieldRegion = getOriginShieldRegion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JpZ2luLXNoaWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9yaWdpbi1zaGllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFFQUFxRTtBQUNyRSxpQ0FBaUM7OztBQUVqQyxnREFBZ0Q7QUFDaEQsd0ZBQXdGO0FBRXhGLG9DQUFvQztBQUNwQyxNQUFNLFdBQVcsR0FBRztJQUNsQixTQUFTLEVBQUUsV0FBVyxFQUFjLHFCQUFxQjtJQUN6RCxTQUFTLEVBQUUsV0FBVyxFQUFjLDZCQUE2QjtJQUNqRSxTQUFTLEVBQUUsV0FBVyxFQUFjLHdCQUF3QjtJQUM1RCxVQUFVLEVBQUUsWUFBWSxFQUFZLDZCQUE2QjtJQUNqRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUksNEJBQTRCO0lBQ2hFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBSSwrQkFBK0I7SUFDbkUsY0FBYyxFQUFFLGdCQUFnQixFQUFJLDRCQUE0QjtJQUNoRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUksMkJBQTJCO0lBQy9ELFlBQVksRUFBRSxjQUFjLEVBQVEseUJBQXlCO0lBQzdELFNBQVMsRUFBRSxXQUFXLEVBQWMsdUJBQXVCO0lBQzNELFNBQVMsRUFBRSxXQUFXLEVBQWMsc0JBQXNCO0lBQzFELFNBQVMsRUFBRSxXQUFXLEVBQWMsZ0NBQWdDO0NBQ3JFLENBQUM7QUFFRiwwQkFBMEI7QUFDMUIsTUFBTSxhQUFhLEdBQUc7SUFDcEIsU0FBUyxFQUFFLFdBQVcsRUFBYyw4QkFBOEI7SUFDbEUsVUFBVSxFQUFFLFlBQVksRUFBWSx5QkFBeUI7SUFDN0QsU0FBUyxFQUFFLFdBQVcsRUFBYywrQkFBK0I7SUFDbkUsWUFBWSxFQUFFLGNBQWMsRUFBUSx1QkFBdUI7SUFDM0QsVUFBVSxFQUFFLFlBQVksRUFBWSxxQkFBcUI7SUFDekQsU0FBUyxFQUFFLFdBQVcsRUFBYyxxQkFBcUI7SUFDekQsVUFBVSxFQUFFLFlBQVksRUFBWSx5QkFBeUI7SUFDN0QsVUFBVSxFQUFFLFlBQVksRUFBWSw0QkFBNEI7Q0FDakUsQ0FBQztBQUVGLHFEQUFxRDtBQUNyRCxvRkFBb0Y7QUFDcEYsTUFBTSxnQ0FBZ0MsR0FBRyxJQUFJLEdBQUcsQ0FBQztJQUMvQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFjLE1BQU07SUFDbEUsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBYyxNQUFNO0lBQ2xFLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQWMsTUFBTTtJQUNsRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFZLE1BQU07SUFDbEUsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxjQUFjLENBQUMsRUFBSSxNQUFNO0lBQ2xFLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsY0FBYyxDQUFDLEVBQUksTUFBTTtJQUNsRSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLGNBQWMsQ0FBQyxFQUFJLE1BQU07SUFDbEUsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxjQUFjLENBQUMsRUFBSSxNQUFNO0lBQ2xFLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsWUFBWSxDQUFDLEVBQVEsTUFBTTtJQUNsRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFjLE1BQU07SUFDbEUsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBYyxNQUFNO0lBQ2xFLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQWMsTUFBTTtJQUVsRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFZLE1BQU07SUFDbEUsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBVyxNQUFNO0lBQ2xFLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsY0FBYyxDQUFDLEVBQU8sTUFBTTtJQUNsRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFTLE1BQU07SUFDbEUsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBUSxNQUFNO0lBQ2xFLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQVksTUFBTTtJQUNsRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFXLE1BQU07SUFDbEUsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBVSxNQUFNO0NBQ25FLENBQUMsQ0FBQztBQUVJLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxNQUFjLEVBQUUsRUFBRTtJQUN0RCxNQUFNLGtCQUFrQixHQUFHLGdDQUFnQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4RSxJQUFJLGtCQUFrQixLQUFLLFNBQVM7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixNQUFNLG9CQUFvQixDQUFDLENBQUM7SUFFMUcsT0FBTyxrQkFBa0IsQ0FBQztBQUM1QixDQUFDLENBQUE7QUFMWSxRQUFBLHFCQUFxQix5QkFLakMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBNSVQtMFxuXG4vLyBBbGwgcmVnaW9ucyBhbmQgdGhlaXIgb3JkZXJpbmcgYXJlIHRha2VuIGZyb21cbi8vIGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9BbWF6b25DbG91ZEZyb250L2xhdGVzdC9EZXZlbG9wZXJHdWlkZS9vcmlnaW4tc2hpZWxkLmh0bWxcblxuLy8gUmVnaW9ucyB3aXRoIFJlZ2lvbmFsIEVkZ2UgQ2FjaGVzXG5jb25zdCBSRUNfUkVHSU9OUyA9IHtcbiAgVVNfRUFTVF8yOiBcInVzLWVhc3QtMlwiLCAgICAgICAgICAgICAvLyAgMS4gVVMgRWFzdCAoT2hpbylcbiAgVVNfRUFTVF8xOiBcInVzLWVhc3QtMVwiLCAgICAgICAgICAgICAvLyAgMi4gVVMgRWFzdCAoTi4gVmlyZ2luaWEpIFxuICBVU19XRVNUXzI6IFwidXMtd2VzdC0yXCIsICAgICAgICAgICAgIC8vICAzLiBVUyBXZXN0IChPcmVnb24pIFxuICBBUF9TT1VUSF8xOiBcImFwLXNvdXRoLTFcIiwgICAgICAgICAgIC8vICA0LiBBc2lhIFBhY2lmaWMgKE11bWJhaSkgXG4gIEFQX05PUlRIRUFTVF8yOiBcImFwLW5vcnRoZWFzdC0yXCIsICAgLy8gIDUuIEFzaWEgUGFjaWZpYyAoU2VvdWwpIFxuICBBUF9TT1VUSEVBU1RfMTogXCJhcC1zb3V0aGVhc3QtMVwiLCAgIC8vICA2LiBBc2lhIFBhY2lmaWMgKFNpbmdhcG9yZSlcbiAgQVBfU09VVEhFQVNUXzI6IFwiYXAtc291dGhlYXN0LTJcIiwgICAvLyAgNy4gQXNpYSBQYWNpZmljIChTeWRuZXkpXG4gIEFQX05PUlRIRUFTVF8xOiBcImFwLW5vcnRoZWFzdC0xXCIsICAgLy8gIDguIEFzaWEgUGFjaWZpYyAoVG9reW8pXG4gIEVVX0NFTlRSQUxfMTogXCJldS1jZW50cmFsLTFcIiwgICAgICAgLy8gIDkuIEV1cm9wZSAoRnJhbmtmdXJ0KVxuICBFVV9XRVNUXzE6IFwiZXUtd2VzdC0xXCIsICAgICAgICAgICAgIC8vIDEwLiBFdXJvcGUgKElyZWxhbmQpXG4gIEVVX1dFU1RfMjogXCJldS13ZXN0LTJcIiwgICAgICAgICAgICAgLy8gMTEuIEV1cm9wZSAoTG9uZG9uKVxuICBTQV9FQVNUXzE6IFwic2EtZWFzdC0xXCIsICAgICAgICAgICAgIC8vIDEyLiBTb3V0aCBBbWVyaWNhIChTw6NvIFBhdWxvKVxufTtcblxuLy8gT3RoZXIgc3VwcG9ydGVkIHJlZ2lvbnNcbmNvbnN0IE9USEVSX1JFR0lPTlMgPSB7XG4gIFVTX1dFU1RfMTogXCJ1cy13ZXN0LTFcIiwgICAgICAgICAgICAgLy8gMTMuIFVTIFdlc3QgKE4uIENhbGlmb3JuaWEpXG4gIEFGX1NPVVRIXzE6IFwiYWYtc291dGgtMVwiLCAgICAgICAgICAgLy8gMTQuIEFmcmljYSAoQ2FwZSBUb3duKVxuICBBUF9FQVNUXzE6IFwiYXAtZWFzdC0xXCIsICAgICAgICAgICAgIC8vIDE1LiBBc2lhIFBhY2lmaWMgKEhvbmcgS29uZylcbiAgQ0FfQ0VOVFJBTF8xOiBcImNhLWNlbnRyYWwtMVwiLCAgICAgICAvLyAxNi4gQ2FuYWRhIChDZW50cmFsKVxuICBFVV9TT1VUSF8xOiBcImV1LXNvdXRoLTFcIiwgICAgICAgICAgIC8vIDE3LiBFdXJvcGUgKE1pbGFuKVxuICBFVV9XRVNUXzM6IFwiZXUtd2VzdC0zXCIsICAgICAgICAgICAgIC8vIDE4LiBFdXJvcGUgKFBhcmlzKVxuICBFVV9OT1JUSF8xOiBcImV1LW5vcnRoLTFcIiwgICAgICAgICAgIC8vIDE5LiBFdXJvcGUgKFN0b2NraG9sbSlcbiAgTUVfU09VVEhfMTogXCJtZS1zb3V0aC0xXCIsICAgICAgICAgICAvLyAyMC4gTWlkZGxlIEVhc3QgKEJhaHJhaW4pXG59O1xuXG4vLyBSZWdpb24gdG8gT3JpZ2luIFNoaWVsZCBtYXBwaW5ncyBiYXNlZCBvbiBsYXRlbmN5LlxuLy8gVG8gYmUgdXBkYXRlZCB3aGVuIG5ldyBSZWdpb25zIGFyZSBhdmFpbGFibGUgb3IgbmV3IFJFQ3MgYXJlIGFkZGVkIHRvIENsb3VkRnJvbnQuXG5jb25zdCBSRUdJT05fVE9fT1JJR0lOX1NISUVMRF9NQVBQSU5HUyA9IG5ldyBNYXAoW1xuICBbUkVDX1JFR0lPTlMuVVNfRUFTVF8yLCBSRUNfUkVHSU9OUy5VU19FQVNUXzJdLCAgICAgICAgICAgICAvLyAgMS5cbiAgW1JFQ19SRUdJT05TLlVTX0VBU1RfMSwgUkVDX1JFR0lPTlMuVVNfRUFTVF8xXSwgICAgICAgICAgICAgLy8gIDIuXG4gIFtSRUNfUkVHSU9OUy5VU19XRVNUXzIsIFJFQ19SRUdJT05TLlVTX1dFU1RfMl0sICAgICAgICAgICAgIC8vICAzLlxuICBbUkVDX1JFR0lPTlMuQVBfU09VVEhfMSwgUkVDX1JFR0lPTlMuQVBfU09VVEhfMV0sICAgICAgICAgICAvLyAgNC5cbiAgW1JFQ19SRUdJT05TLkFQX05PUlRIRUFTVF8yLCBSRUNfUkVHSU9OUy5BUF9OT1JUSEVBU1RfMl0sICAgLy8gIDUuXG4gIFtSRUNfUkVHSU9OUy5BUF9TT1VUSEVBU1RfMSwgUkVDX1JFR0lPTlMuQVBfU09VVEhFQVNUXzFdLCAgIC8vICA2LlxuICBbUkVDX1JFR0lPTlMuQVBfU09VVEhFQVNUXzIsIFJFQ19SRUdJT05TLkFQX1NPVVRIRUFTVF8yXSwgICAvLyAgNy5cbiAgW1JFQ19SRUdJT05TLkFQX05PUlRIRUFTVF8xLCBSRUNfUkVHSU9OUy5BUF9OT1JUSEVBU1RfMV0sICAgLy8gIDguXG4gIFtSRUNfUkVHSU9OUy5FVV9DRU5UUkFMXzEsIFJFQ19SRUdJT05TLkVVX0NFTlRSQUxfMV0sICAgICAgIC8vICA5LlxuICBbUkVDX1JFR0lPTlMuRVVfV0VTVF8xLCBSRUNfUkVHSU9OUy5FVV9XRVNUXzFdLCAgICAgICAgICAgICAvLyAxMC5cbiAgW1JFQ19SRUdJT05TLkVVX1dFU1RfMiwgUkVDX1JFR0lPTlMuRVVfV0VTVF8yXSwgICAgICAgICAgICAgLy8gMTEuXG4gIFtSRUNfUkVHSU9OUy5TQV9FQVNUXzEsIFJFQ19SRUdJT05TLlNBX0VBU1RfMV0sICAgICAgICAgICAgIC8vIDEyLlxuXG4gIFtPVEhFUl9SRUdJT05TLlVTX1dFU1RfMSwgUkVDX1JFR0lPTlMuVVNfV0VTVF8yXSwgICAgICAgICAgIC8vIDEzLlxuICBbT1RIRVJfUkVHSU9OUy5BRl9TT1VUSF8xLCBSRUNfUkVHSU9OUy5FVV9XRVNUXzFdLCAgICAgICAgICAvLyAxNC5cbiAgW09USEVSX1JFR0lPTlMuQVBfRUFTVF8xLCBSRUNfUkVHSU9OUy5BUF9TT1VUSEVBU1RfMV0sICAgICAgLy8gMTUuXG4gIFtPVEhFUl9SRUdJT05TLkNBX0NFTlRSQUxfMSwgUkVDX1JFR0lPTlMuVVNfRUFTVF8xXSwgICAgICAgIC8vIDE2LlxuICBbT1RIRVJfUkVHSU9OUy5FVV9TT1VUSF8xLCBSRUNfUkVHSU9OUy5FVV9DRU5UUkFMXzFdLCAgICAgICAvLyAxNy5cbiAgW09USEVSX1JFR0lPTlMuRVVfV0VTVF8zLCBSRUNfUkVHSU9OUy5FVV9XRVNUXzJdLCAgICAgICAgICAgLy8gMTguXG4gIFtPVEhFUl9SRUdJT05TLkVVX05PUlRIXzEsIFJFQ19SRUdJT05TLkVVX1dFU1RfMl0sICAgICAgICAgIC8vIDE5LlxuICBbT1RIRVJfUkVHSU9OUy5NRV9TT1VUSF8xLCBSRUNfUkVHSU9OUy5BUF9TT1VUSF8xXSwgICAgICAgICAvLyAyMC5cbl0pO1xuXG5leHBvcnQgY29uc3QgZ2V0T3JpZ2luU2hpZWxkUmVnaW9uID0gKHJlZ2lvbjogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IG9yaWdpblNoaWVsZFJlZ2lvbiA9IFJFR0lPTl9UT19PUklHSU5fU0hJRUxEX01BUFBJTkdTLmdldChyZWdpb24pO1xuICBpZiAob3JpZ2luU2hpZWxkUmVnaW9uID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcihgVGhlIHNwZWNpZmllZCByZWdpb24gJHtyZWdpb259IGlzIG5vdCBzdXBwb3J0ZWQuYCk7XG5cbiAgcmV0dXJuIG9yaWdpblNoaWVsZFJlZ2lvbjtcbn1cbiJdfQ==