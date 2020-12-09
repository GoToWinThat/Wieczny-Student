using AutoMapper;
using Domain.Entities;
using Monopoly.Core.Base.Mappings;
using Monopoly.Core.UseCases.MonopolyFields.Queries.GetFields.Dto;
using NUnit.Framework;
using System;
using System.Runtime.Serialization;

namespace Core.Tests.Mappings
{
    public class MappingTests
    {
        private readonly IConfigurationProvider _configuration;
        private readonly IMapper _mapper;

        public MappingTests()
        {
            _configuration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });

            _mapper = _configuration.CreateMapper();
        }

        [Test]
        public void ShouldHaveValidConfiguration()
        {
            _configuration.AssertConfigurationIsValid();
        }

        [Test]
        [TestCase(typeof(CornerField), typeof(CornerFieldDto))]
        [TestCase(typeof(PropertyField), typeof(PropertyFieldDto))]
        [TestCase(typeof(EventField), typeof(EventFieldDto))]
        public void ShouldSupportMappingFromSourceToDestination(Type source, Type destination)
        {
            var instance = GetInstanceOf(source);

            _mapper.Map(instance, source, destination);
        }

        private object GetInstanceOf(Type type)
        {
            if (type.GetConstructor(Type.EmptyTypes) != null)
                return Activator.CreateInstance(type);

            // Type without parameterless constructor
            return FormatterServices.GetUninitializedObject(type);
        }
    }
}
