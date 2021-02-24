using Domain.Enums;

namespace Domain.Entities
{
    public class CornerField : MonopolyField
    {
        public CornerField() { Type = MonopolyFieldType.corner; }
    }
}
