namespace StoreBackend.Exceptions;

public class ResourceConflictException : Exception
{
    public ResourceConflictException() : base("Resource already exists")
    {
    }

    public ResourceConflictException(string message) : base(message)
    {
    }
}
